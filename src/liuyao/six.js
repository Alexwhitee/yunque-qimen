// 六爻

// ... 在文件顶部的常量区域添加 ...
// ... 在文件顶部的常量区域添加 ...


// ... 在文件顶部的常量区域添加 ...

/**
 * 墓库地支到其所墓五行的映射表
 * key: 地支索引, value: [五行索引]
 */
const TOMB_ZHI_TO_ELEMENTS_MAP = {
    10: [2],       // 戌 墓 火
    7:  [1],       // 未 墓 木
    1:  [4],       // 丑 墓 金
    4:  [0, 3],    // 辰 墓 水、土
};


/**
 * 化进神的地支映射表
 * key: 动爻地支, value: 变爻地支
 */
const EVOLUTION_ADVANCE_MAP = {
    11: 0,  // 亥 -> 子
    2: 3,   // 寅 -> 卯
    5: 6,   // 巳 -> 午
    8: 9,   // 申 -> 酉
    1: 4,   // 丑 -> 辰
    4: 7,   // 辰 -> 未
    7: 10,  // 未 -> 戌
};

/**
 * 化退神的地支映射表
 * key: 动爻地支, value: 变爻地支
 */
const EVOLUTION_RETREAT_MAP = {
    0: 11,  // 子 -> 亥
    3: 2,   // 卯 -> 寅
    6: 5,   // 午 -> 巳
    9: 8,   // 酉 -> 申
    4: 1,   // 辰 -> 丑
    7: 4,   // 未 -> 辰
    10: 7,  // 戌 -> 未
};


// ... 在文件顶部的常量区域，与其他 EVOLUTION_* MAP 放在一起 ...

/**
 * 化反吟的地支映射表 (六冲关系)
 * key: 动爻地支, value: 变爻地支
 */
const EVOLUTION_FANYIN_MAP = {
    0: 6,   // 子 -> 午
    6: 0,   // 午 -> 子
    1: 7,   // 丑 -> 未
    7: 1,   // 未 -> 丑
    2: 8,   // 寅 -> 申
    8: 2,   // 申 -> 寅
    3: 9,   // 卯 -> 酉
    9: 3,   // 酉 -> 卯
    4: 10,  // 辰 -> 戌
    10: 4,  // 戌 -> 辰
    5: 11,  // 巳 -> 亥
    11: 5,  // 亥 -> 巳
};

/**
 * 月令关系码到中文描述的映射表
 */
const MONTH_RELATION_MAP = {
    14: '月破兼爻克月',
    15: '月破兼月克',
    22: '月合兼月生',
    23: '月合兼泄气',
    24: '月合但爻克月',
    25: '月合但月克',
    31: '临月建', // 简化名称以适应显示
    32: '月生',
    33: '月泄',
    34: '爻克月',
    35: '月克',
    // 逻辑上不可能出现的代码可以省略，或留空
    0: '' // 默认值
};

/**
 * 日辰关系码到中文描述的映射表
 */
const DAY_RELATION_MAP = {
    14: '日冲兼爻克日',
    15: '日冲兼克', // 日辰冲克通常直接称为“日冲”或“暗动”
    22: '日合兼生',
    23: '日合兼泄',
    24: '日合但克日',
    25: '日合但被克',
    31: '临日建',
    32: '日生',
    33: '日泄',
    34: '爻克日',
    35: '日克',
    0: '' // 默认值
};



/**
 * 64卦对应的名字
 * 规律：对角线为八纯卦，每行都包含同一个八宫的专有名词
 */
export const GuaName = [
    '坤为地', '地雷复', '地水师', '地泽临', '地山谦', '地火明夷', '地风升', '地天泰',
    '雷地豫', '震为雷', '雷水解', '雷泽归妹', '雷山小过', '雷火丰', '雷风恒', '雷天大壮',
    '水地比', '水雷屯', '坎为水', '水泽节', '水山蹇', '水火既济', '水风井', '水天需',
    '泽地萃', '泽雷随', '泽水困', '兑为泽', '泽山咸', '泽火革', '泽风大过', '泽天夬',
    '山地剥', '山雷颐', '山水蒙', '山泽损', '艮为山', '山火贲', '山风蛊', '山天大畜',
    '火地晋', '火雷噬嗑', '火水未济', '火泽睽', '火山旅', '离为火', '火风鼎', '火天大有',
    '风地观', '风雷益', '风水涣', '风泽中孚', '风山渐', '风火家人', '巽为风', '风天小畜',
    '天地否', '天雷无妄', '天水讼', '天泽履', '天山遁', '天火同人', '天风姤', '乾为天',
];

const GuaGong  = [0,0,2,0,3,2,1,0,1,1,1,3,3,2,1,0,0,2,2,2,3,2,1,0,3,1,3,3,3,2,1,0,7,6,5,4,4,4,6,4,7,6,5,4,5,5,5,7,7,6,5,4,4,6,6,6,7,6,5,4,7,5,7,7];
const GuaXiang = [0,1,7,2,5,6,4,3,1,0,2,7,6,5,3,4,7,2,0,1,4,3,5,6,2,7,1,0,3,4,6,5,5,6,4,3,0,1,7,2,6,5,3,4,1,0,2,7,4,3,5,6,7,2,0,1,3,4,6,5,2,7,1,0];

/**
 * 先天八卦对应的五行索引
 */
const Gong2Element = [3, 1, 0, 4, 3, 2, 1, 4];

/**
 * 象中的世爻位置(应爻位置在[世爻位置 + 3] % 6)
 */
const Xiang4Yao = [5, 0, 1, 2, 3, 4, 3, 2];

/**
 * 卦的地支
 */
const GuaZ = [
    // 为内卦地支  // 为外挂地支
    [[7,  5,  3], [1, 11,   9]], // 坤
    [[0,  2,  4], [6,  8,  10]], // 震
    [[2,  4,  6], [8, 10,   0]], // 坎
    [[5,  3,  1], [11, 9,   7]], // 兑
    [[4,  6,  8], [10, 0,   2]], // 艮
    [[3,  1, 11], [9,  7,   5]], // 离
    [[1, 11,  9], [7,  5,   3]], // 巽
    [[0,  2,  4], [6,  8,  10]], // 乾
];

/**
 * 卦的六亲(依次对应印比伤才杀)
 */
export const Relations = ['父', '兄', '子', '才', '官'];


/**
 * 六兽起点，分别从甲乙丙丁...依次对应
 */
const AnimalStart = [0,0,1,1,2,3,4,4,5,5];

/**
 * 六兽
 */
export const Animals = ['青', '朱', '勾', '蛇', '白', '玄'];


export const Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

export const Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const Element = ['水', '木', '火', '土', '金'];
const Zhi2Element = [0, 3, 1, 1, 3, 2, 2, 3, 4, 4, 3, 0];
const ZHI_COMBINE_MAP = {0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6};
// export class Attr {
//     constructor() {
//         /**
//          * @type {number} 地支
//          */
//         this.z = undefined
//
//         /**
//          * @type {number} 六亲
//          */
//         this.relation = undefined
//
//         /**
//          * @type {number} 旬空(0无，1有)
//          */
//         this.empty = 0
//
//         /**
//          * @type {number} 0无/1-月建/2-月破
//          */
//         this.m = 0
//
//         /**
//          * @type {number} 0无/1-暗动
//          */
//         this.d = 0
//     }
// }
export class Attr {
    constructor() {
        this.z = undefined;
        this.relation = undefined;
        // 修改点：更新 empty 的默认值
        // 十位: 1=无空, 2=有空
        // 个位: 0=无意义, 1=真空, 2=假空
        this.empty = 10;

        // 月令15类关系编号
        this.m15 = 0;

        // 日辰15类关系编号
        this.d15 = 0;

        // 暗动
        this.d = 0;

        /**
         * @type {number}
         * 可入墓的目标爻的比特掩码。
         * 0b000001 (1) 表示可墓初爻, 0b100000 (32) 表示可墓上爻。
         */
        this.tombTargetMask = 0; // 新增属性
    }
}


// export class Yao extends Attr {
//     constructor(no, type) {
//         super();
//         /**
//          * @type {number} 六爻编号n，0～5
//          */
//         this.no = no;
//
//         /**
//          * @type {number} 六爻数据 0阴爻 1阳爻 2动阴爻 3动阳爻
//          */
//         this.type = type;
//
//         /**
//          * @type {number} 世/应爻内容 0无 1应 2世
//          */
//         this.sy = 0;
//
//         /**
//          * @type {number} 六兽
//          */
//         this.animal = undefined;
//
//         /**
//          * @type {*[]}
//          */
//         this.peace = [];
//
//
//         /**
//          * @type {Attr}
//          */
//         this.change = type > 1 ? new Attr() : undefined;
//     }
// }
export class Yao extends Attr {
    constructor(no, type) {
        super();
        this.no = no;
        this.type = type;
        this.sy = 0;
        this.animal = undefined;
        this.peace = [];
        this.change = type > 1 ? new Attr() : undefined;
        /**
    * @type {null|{natural: number[], fill: number[], clash: number[]}}
    * 存储出空信息的对象，例如: { natural: [干索引, 支索引], ... }
    */
        this.exitEmpty = null;

        /**
         * @type {number} 存储动爻的演化状态
         * 0: 无, 1: 化进神, 2: 化退神
         */
        this.evolution = 0;
        /**
         * @type {number} 存储动爻是否化废的状态
         * 1: 不存在化废 (默认)
         * 2: 化回头克 (变爻克动爻)
         * 3: 化退神
         * 4: 化破 (变爻被月或日冲破)
         */
        this.wastedEvolution = 1; // 新增属性并设置默认值
    }
}
export class Six {
    /**
     * @param times {number[]} 六爻值
     * @param month {number[]} 月柱
     * @param day {number[]} 日柱
     */
    constructor(times, month, day) {
        /**
         * @type {Yao[]}
         */
        this.times = []
        for (let i = 0; i < 6; i++) {
            this.times[i] = new Yao(i, times[i])
        }
        this.month = month
        this.day = day

        /**
         * @type {number} 前卦
         */
        this.front = undefined
        /**
         * @type {number} 后卦
         */
        this.back = undefined
        /**
         * @type {number} 五行
         */
        this.element = undefined

        this.#recognize()
        this.#load()
    }

    names()
    {
        return this.back === undefined ? [GuaName[this.front]] : [GuaName[this.front], GuaName[this.back]]
    }

    #recognize() {
        let f = 0b000000
        let b = 0b000000

        const dynamic = this.times.reduce((p, c) => {
            switch (c.type) {
                case 1:
                    f = f | 1 << c.no;
                    b = b | 1 << c.no;
                    break;
                case 2:
                    b = b | 1 << c.no;
                    break;
                case 3:
                    f = f | 1 << c.no;
            }
            return p || c.type > 1
        }, false)

        this.front = f;
        this.back = dynamic ? b : undefined
    }

    #load() {
        const g = GuaGong[this.front]
        this.element = Gong2Element[g]
        this.#loadZhi()
        this.#loadSY()
        this.#loadRelation()
        this.#loadAnimals()
        this.#loadEvolution();
        this.#loadJPD()
        this.#loadEmpty()
        this.#calculateExitEmpty();
        this.#loadDarkMove();
        this.#loadDefect(g);
        this.#loadWastedEvolution(); // 在所有依赖计算完成后调用
        this.#loadTombRelations(); // 在最后调用
    }


// 在 Six 类的定义中，添加这两个新方法

    /**
     * 计算并加载爻与爻之间的入墓关系
     */
    // #loadTombRelations() {
    //     this.times.forEach(yao => {
    //         // 只有动爻和其变爻才能成为墓库的提供者
    //         if (yao.type < 2) {
    //             return;
    //         }
    //
    //         // 1. 计算动爻本身作为墓库提供者的情况
    //         yao.tombTargetMask = this.#calculateTombMask(yao, false, null);
    //
    //         // 2. 计算其变爻作为墓库提供者的情况
    //         if (yao.change) {
    //             yao.change.tombTargetMask = this.#calculateTombMask(yao.change, true, yao);
    //         }
    //     });
    // }

    // /**
    //  * 辅助方法：计算一个给定的爻/变爻能墓哪些爻
    //  * @param {Attr} tomberAttr - 墓库提供者 (动爻或变爻的 Attr)
    //  * @param {boolean} isChangeYao - 标记提供者是否为变爻
    //  * @param {Yao | null} originalMovingYao - 如果是变爻，则传入其原始动爻
    //  * @returns {number} - 代表可入墓目标的比特掩码
    //  */
    // #calculateTombMask(tomberAttr, isChangeYao, originalMovingYao) {
    //     const elementsToTomb = TOMB_ZHI_TO_ELEMENTS_MAP[tomberAttr.z];
    //
    //     // 如果此地支不是墓库，则不能墓任何爻
    //     if (!elementsToTomb) {
    //         return 0;
    //     }
    //
    //     let mask = 0;
    //
    //     this.times.forEach(targetYao => {
    //         const targetElement = this.#z2e(targetYao.z);
    //
    //         // 如果目标爻的五行不匹配，则跳过
    //         if (!elementsToTomb.includes(targetElement)) {
    //             return;
    //         }
    //
    //         // 五行匹配，开始应用规则
    //         if (targetYao.type < 2) {
    //             // 规则1: 静爻可以入任何动爻或变爻的墓
    //             mask |= (1 << targetYao.no);
    //         } else if (targetYao.type > 1) {
    //             // 规则2: 动爻只能入其自身变爻的墓
    //             if (isChangeYao && targetYao === originalMovingYao) {
    //                 mask |= (1 << targetYao.no);
    //             }
    //         }
    //     });
    //
    //     return mask;
    // }






    // 在 Six 类的定义中，替换为这两个新方法

    /**
     * 计算并加载爻与爻之间以及与卦宫的入墓关系
     */
    #loadTombRelations() {
        this.times.forEach(yao => {
            // 只有动爻和其变爻才能成为墓库的提供者
            if (yao.type < 2) {
                return;
            }

            // 1. 计算动爻本身作为墓库提供者的情况
            yao.tombTargetMask = this.#calculateTombMask(yao, false, null);

            // 2. 计算其变爻作为墓库提供者的情况
            if (yao.change) {
                yao.change.tombTargetMask = this.#calculateTombMask(yao.change, true, yao);
            }
        });
    }

    /**
     * 辅助方法：计算一个给定的爻/变爻能墓哪些爻以及是否能墓卦宫
     * @param {Attr} tomberAttr - 墓库提供者 (动爻或变爻的 Attr)
     * @param {boolean} isChangeYao - 标记提供者是否为变爻
     * @param {Yao | null} originalMovingYao - 如果是变爻，则传入其原始动爻
     * @returns {number} - 代表可入墓目标的7位比特掩码 (第6位为卦宫)
     */
    #calculateTombMask(tomberAttr, isChangeYao, originalMovingYao) {
        const elementsToTomb = TOMB_ZHI_TO_ELEMENTS_MAP[tomberAttr.z];

        // 如果此地支不是墓库，则不能墓任何对象
        if (!elementsToTomb) {
            return 0;
        }

        let mask = 0;

        // --- 新增逻辑：首先判断是否能墓卦宫 ---
        const guaGongElement = this.element;
        if (elementsToTomb.includes(guaGongElement)) {
            // 将第6位置为1，代表卦宫
            mask |= (1 << 6);
        }

        // --- 原有逻辑：继续判断能墓哪些爻 ---
        this.times.forEach(targetYao => {
            const targetElement = this.#z2e(targetYao.z);

            // 如果目标爻的五行不匹配，则跳过
            if (!elementsToTomb.includes(targetElement)) {
                return;
            }

            // 五行匹配，开始应用规则
            if (targetYao.type < 2) {
                // 规则1: 静爻可以入任何动爻或变爻的墓
                mask |= (1 << targetYao.no);
            } else if (targetYao.type > 1) {
                // 规则2: 动爻只能入其自身变爻的墓
                if (isChangeYao && targetYao === originalMovingYao) {
                    mask |= (1 << targetYao.no);
                }
            }
        });

        return mask;
    }




// 在 Six 类的定义中...

    /**
     * 根据详细规则判断暗动
     * 暗动 vs 日破: 静爻被日辰冲，旺相为暗动，休囚为日破。空亡被冲也为暗动。
     */
    #loadDarkMove() {
        this.times.forEach(yao => {
            // 首先，只有静爻才有可能暗动
            if (yao.type >= 2) {
                return; // 动爻直接跳过
            }

            // 条件1: 必须被日辰所冲
            const isClashedByDay = Math.floor(yao.d15 / 10) === 1;
            if (!isClashedByDay) {
                return; // 不被日冲，直接跳过
            }

            // 至此，爻为静爻且被日冲，下面根据旬空和旺衰来判断
            const isEmpty = Math.floor(yao.empty / 10) === 2;

            if (isEmpty) {
                // 情况B: 爻处于旬空状态，被日冲即为暗动 (待出空/填实后发动)
                yao.d = 1; // 标记为暗动
            } else {
                // 情况A: 爻不处于旬空状态，需要判断旺衰
                const monthRelation = yao.m15 % 10;
                const dayRelation = yao.d15 % 10;

                // 旺相 = 得月/日生扶 (生我 or 同我)
                const isStrongByMonth = (monthRelation === 2 || monthRelation === 1);
                const isStrongByDay = (dayRelation === 2 || dayRelation === 1);

                if (isStrongByMonth || isStrongByDay) {
                    // 爻得生扶，旺相，为暗动
                    yao.d = 1; // 标记为暗动
                } else {
                    // 爻休囚无气，被日冲为“日破”，不能发动，故不标记
                    yao.d = 0;
                }
            }
        });
    }



    /**
     * 辅助方法：从指定的开始日期，查找下一个地支为 targetZhi 的日子的干支
     * @param {[number, number]} startDay - 开始日期的 [干索引, 支索引]
     * @param {number} targetZhi - 目标地支的索引
     * @returns {[number, number]} - 目标日的 [干索引, 支索引]
     */
    #findNextGanZhi(startDay, targetZhi) {
        const startGan = startDay[0];
        const startZhi = startDay[1];
        // 计算目标地支与开始地支相差的天数
        let daysToAdd = (targetZhi - startZhi + 12) % 12;

        // 如果差值为0，意味着是同一天，根据规则应为12天后
        if (daysToAdd === 0) {
            daysToAdd = 12;
        }
        const nextGan = (startGan + daysToAdd) % 10;
        const nextZhi = (startZhi + daysToAdd) % 12; // 这必然等于 targetZhi
        return [nextGan, nextZhi];
    }
    /**
     * 计算所有空亡爻的出空日期
     */
    #calculateExitEmpty() {
        this.times.forEach(yao => {
            // 检查一个爻是否旬空 (十位为2)
            if (Math.floor(yao.empty / 10) !== 2) {
                return; // 如果不空，则跳过
            }

            // 1. 计算自然出空
            // 第十一天，即在当前日干支上加10
            const naturalGan = (this.day[0] + 10) % 10;
            const naturalZhi = (this.day[1] + 10) % 12;
            // 2. 计算填实
            // 目标地支就是爻自身的地支
            const fillZhi = yao.z;
            const fillGanZhi = this.#findNextGanZhi(this.day, fillZhi);
            // 3. 计算冲实
            // 目标地支是与爻相冲的地支
            const clashZhi = (yao.z + 6) % 12;
            const clashGanZhi = this.#findNextGanZhi(this.day, clashZhi);

            // 4. 存储结果
            yao.exitEmpty = {
                natural: [naturalGan, naturalZhi],
                fill: fillGanZhi,
                clash: clashGanZhi,
            };
        });
    }




    /**
     * 装卦的地支
     */
    #loadZhi() {
        // 装前卦
        let out = this.front >> 3;
        let inside = this.front & 0b000111;

        let i = GuaZ[inside][0];
        let o = GuaZ[out][1];

        let gz = [...i, ...o];

        this.times.forEach((y) => {
            y.z = gz[y.no]
        })

        if (this.back !== undefined) { // 装后卦
            out = this.back >> 3;
            inside = this.back & 0b000111;

            i = GuaZ[inside][0];
            o = GuaZ[out][1];

            gz = [...i, ...o];
            this.times.forEach((y) => {
                if (y.change) {
                    y.change.z = gz[y.no]
                }
            })
        }
    }

    /**
     * 装卦世应
     */
    #loadSY() {
        const x = GuaXiang[this.front];

        const a = Xiang4Yao[x];
        const b = (a + 3) % 6;

        this.times[a].sy = 2;
        this.times[b].sy = 1;
    }

    /**
     * 装卦六亲
     */
    #loadRelation() {
        this.times.forEach((y) => {
            y.relation = this.#spirit(this.element, this.#z2e(y.z))
            if (y.change) {
                y.change.relation = this.#spirit(this.element, this.#z2e(y.change.z))
            }
        })
    }

    /**
     * 装卦六兽
     */
    #loadAnimals() {
        let start = AnimalStart[this.day[0]];

        this.times.forEach((y) => {
            y.animal = start % 6
            start++
        })
    }


    /**
     * 装卦旬空，并判断真空/假空
     */
    #loadEmpty() {
        // 步骤 1: 计算空亡地支 (逻辑不变)
        const s = 9 - this.day[0] + this.day[1];
        const kong = [(s + 1) % 12, (s + 2) % 12];

        // 步骤 2: 预先找出卦中所有的动爻，供后续判断使用
        const movingYaos = this.times.filter(y => y.type > 1);

        // 步骤 3: 遍历每个爻，判断其旬空状态
        this.times.forEach((yao) => {
            // --- 主爻判断 ---
            if (yao.z !== undefined && kong.includes(yao.z)) {
                // 此爻落入空亡，现在判断是真空还是假空

                // 条件1: 旬空 (已满足)
                // 条件2: 不是动爻
                const isStatic = yao.type < 2;

                // 条件3: 对月令休囚死 (爻生月/爻克月/月克爻)
                const monthRelation = yao.m15 % 10; // 取m15的个位数
                const isWeakToMonth = [3, 4, 5].includes(monthRelation);

                // 条件4: 无其他动爻来生
                const noMovingYaoProducesIt = !movingYaos.some(mover => {
                    // 确保动爻不是自身，并且五行相生
                    if (mover.no === yao.no) return false;
                    const moverElement = Zhi2Element[mover.z];
                    const currentYaoElement = Zhi2Element[yao.z];
                    return (moverElement + 1) % 5 === currentYaoElement;
                });

                // 条件5: 无日辰来冲 (注意，这是您描述的第4个条件)
                const notClashedByDay = Math.floor(yao.d15 / 10) !== 1; // d15十位不为1

                // 综合判断
                if (isStatic && isWeakToMonth && noMovingYaoProducesIt && notClashedByDay) {
                    // 同时满足所有条件，为真空
                    yao.empty = 21; // 十位2:有空, 个位1:真空
                } else {
                    // 任何一个条件不满足，为假空
                    yao.empty = 22; // 十位2:有空, 个位2:假空
                }
            }

            // --- 变爻判断 ---
            // 变爻是动变的结果，不符合“不是动爻”的静态前提，因此变爻如果旬空，通常视为假空。
            if (yao.change && yao.change.z !== undefined && kong.includes(yao.change.z)) {
                yao.change.empty = 22; // 变爻空亡，计为假空
            }
        });
    }

// 在 Six 类的定义中...

    /**
     * 判断动爻的化进神与化退神
     */
    #loadEvolution() {
        this.times.forEach(yao => {
            // 只对动爻进行判断
            if (yao.type < 2 || !yao.change) {
                return;
            }

            const fromZhi = yao.z;
            const toZhi = yao.change.z;

            // 判断化进神
            if (EVOLUTION_ADVANCE_MAP[fromZhi] === toZhi) {
                yao.evolution = 1; // 标记为化进
                return; // 找到后即可结束当前爻的判断
            }

            // 判断化退神
            if (EVOLUTION_RETREAT_MAP[fromZhi] === toZhi) {
                yao.evolution = 2; // 标记为化退
            }
            if (fromZhi === toZhi) {
                yao.evolution = 3; // 标记为伏吟
            }
            if (EVOLUTION_FANYIN_MAP[fromZhi] === toZhi) {
                yao.evolution = 4; // 标记为反吟
            }
        });
    }



    #loadJPD() {
        const monthZhi = this.month[1];
        const dayZhi = this.day[1];
        this.times.forEach((yao) => {
            if (yao.z !== undefined) {
                yao.m15 = this.#calculateRelationCode(yao.z, monthZhi);
                yao.d15 = this.#calculateRelationCode(yao.z, dayZhi);
            }
            if (yao.change && yao.change.z !== undefined) {
                yao.change.m15 = this.#calculateRelationCode(yao.change.z, monthZhi);
                yao.change.d15 = this.#calculateRelationCode(yao.change.z, dayZhi);
            }
        });
    }
    /**
     * 核心私有方法：根据新的编码规则计算关系码
     * @param {number} yaoZhi - 爻的地支索引 (0-11)
     * @param {number} refZhi - 参照地支索引 (月令或日辰, 0-11)
     * @returns {number} - 组合后的两位数关系码
     */
    #calculateRelationCode(yaoZhi, refZhi) {
        // --- 1. 计算十位数 (地支关系) ---
        let shiwei;
        if (Math.abs(yaoZhi - refZhi) === 6) {
            shiwei = 1; // 冲
        } else if (ZHI_COMBINE_MAP[yaoZhi] === refZhi) {
            shiwei = 2; // 合
        } else {
            shiwei = 3; // 无冲无合
        }
        // --- 2. 计算个位数 (五行关系) ---
        const yaoElement = Zhi2Element[yaoZhi];
        const refElement = Zhi2Element[refZhi];
        let gewei;
        if (yaoElement === refElement) {
            gewei = 1; // 同我
        } else if ((refElement + 1) % 5 === yaoElement) {
            gewei = 2; // 生我
        } else if ((yaoElement + 1) % 5 === refElement) {
            gewei = 3; // 我生
        } else if ((yaoElement + 2) % 5 === refElement) {
            gewei = 4; // 我克
        } else if ((refElement + 2) % 5 === yaoElement) {
            gewei = 5; // 克我
        } else {
            // 理论上五行关系只有这五种，此分支不应被执行
            return 0;
        }
        // --- 3. 组合编码 ---
        return shiwei * 10 + gewei;
    }


    /**
     * 修复缺失的六亲(在内外卦都没有，则为缺失六亲)
     * @param gong {number}
     */
    #loadDefect(gong) {
        let exists = 0b00000; // 用二进制表示是否存在对应的六亲，依次为父、兄、子、才、官，默认为不存在
        /** @var Yao $yao */
        this.times.forEach((y) => {
            exists = exists | 1 << y.relation;
            if (y.change) {
                exists = exists | 1 << y.change.relation;
            }
        })
        if (exists !== 0b11111) {
            const GuaZhi = GuaZ[gong].flat(1); // 根据当前卦所在的宫的第一个卦，得到对应的地支
            const relations = GuaZhi.map(z => [z, this.#spirit(this.element, this.#z2e(z))]);

            relations.forEach((r, index) => {
                if (((exists >> r[1]) & 0b00001) === 0) { // 判断当前位置$index的六亲是否已经存在
                    this.times[index].peace = r;
                }
            })
        }
}



// 在 Six 类的定义中，添加这个新方法
// ... (在 #loadDefect(gong) 方法之后)

    /**
     * 判断动爻是否化废 (回头克、化破、化退)
     */
    #loadWastedEvolution() {
        this.times.forEach(yao => {
            // 只处理有变化的动爻
            if (yao.type < 2 || !yao.change) {
                return;
            }

            // 按照优先级判断：回头克 > 化破 > 化退

            // 1. 判断是否化回头克
            const mainElement = this.#z2e(yao.z);
            const changeElement = this.#z2e(yao.change.z);
            if ((mainElement + 2) % 5 === changeElement) {
                yao.wastedEvolution = 2; // 标记为回头克
                return; // 满足最高优先级，结束当前爻的判断
            }

            // 2. 判断是否化破 (变爻被月或日冲破)
            const isBrokenByMonth = Math.floor(yao.change.m15 / 10) === 1;
            const isBrokenByDay = Math.floor(yao.change.d15 / 10) === 1;
            if (isBrokenByMonth || isBrokenByDay) {
                yao.wastedEvolution = 4; // 标记为化破
                return; // 满足条件，结束判断
            }

            // 3. 判断是否化退神
            if (yao.evolution === 2) {
                yao.wastedEvolution = 3; // 标记为化退
                return; // 满足条件，结束判断
            }
        });
    }

// ... (其他方法)

    /**
     * 算五神
     * @param ie {number} 我的五行
     * @param oe {number} 其他的五行
     * @returns {number}
     */
    #spirit(ie, oe) {
        return ((6 - ie) % 5 + oe) % 5
    }

    /**
     * 地支对应的五行
     * @param z
     * @returns {number}
     */
    #z2e(z) {
        return [0, 3, 1, 1, 3, 2, 2, 3, 4, 4, 3, 0][z]
    }



    // 在 Six 类的 console() 方法中，修改循环内的逻辑
    // console() {
    //     const GP = ['- -', '---', '-x-', '-0-'];
    //     // 新增一个映射表，用于显示化废状态
    //     const WASTED_EVOLUTION_MAP = {
    //         2: '回头克',
    //         3: '化退',
    //         4: '化破'
    //     };
    //     const YAO_NAMES = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
    //
    //     const formatTombMask = (mask) => {
    //         if (mask === 0) return '';
    //         const targets = [];
    //         for (let i = 0; i < 6; i++) {
    //             if ((mask >> i) & 1) {
    //                 targets.push(YAO_NAMES[i]);
    //             }
    //         }
    //         return `入墓: ${targets.join(', ')}`;
    //     };
    //
    //
    //
    //     console.log(Gan[this.month[0]] + Zhi[this.month[1]] + '月' + Gan[this.day[0]] + Zhi[this.day[1]] + '日');
    //     console.log(this.names().join("之"), Element[this.element]);
    //     console.log('--------------------------------------------------');
    //
    //     for (let i = 5; i >= 0; i--) {
    //         const yao = this.times[i];
    //
    //         const sy = ['　', '应', '世'][yao.sy];
    //         const zhi = Zhi[yao.z];
    //         const r = Relations[yao.relation];
    //         const animal = Animals[yao.animal];
    //
    //         let cz = '　', cr = '　', evolutionStr = '';
    //         if (yao.change) {
    //             cz = Zhi[yao.change.z];
    //             cr = Relations[yao.change.relation];
    //
    //             // 组合显示 evolution 和 wastedEvolution
    //             let evolutionParts = [];
    //
    //             if (yao.evolution === 1) {
    //                 evolutionParts.push('进');
    //             } else if (yao.evolution === 2) {
    //                 // 化退信息现在由 wastedEvolution 控制
    //             } else if (yao.evolution === 3) {
    //                 evolutionParts.push('伏吟');
    //             } else if (yao.evolution === 4) {
    //                 evolutionParts.push('反吟');
    //             }
    //
    //             // 如果有化废状态，则优先显示
    //             if (yao.wastedEvolution > 1) {
    //                 evolutionParts.push(WASTED_EVOLUTION_MAP[yao.wastedEvolution]);
    //             }
    //
    //             if (evolutionParts.length > 0) {
    //                 evolutionStr = '→ ' + evolutionParts.join(', ');
    //             }
    //         }
    //
    //         let emptyStatus = '　　';
    //         if (Math.floor(yao.empty / 10) === 2) {
    //             emptyStatus = (yao.empty % 10 === 1) ? '真空' : '假空';
    //         }
    //
    //         const fu = yao.peace.length ? '伏' + Zhi[yao.peace[0]] + Relations[yao.peace[1]] : '　　　';
    //         const No = yao.no + 1;
    //
    //         console.log(`${No} ${sy} ${animal} ${r} ${GP[yao.type]} ${zhi} [${emptyStatus} ${fu}] ${cz} ${cr} ${evolutionStr}`);
    //
    //         // ... (剩余的 console() 代码保持不变)
    //         const monthDesc = MONTH_RELATION_MAP[yao.m15] || '';
    //         const dayDesc = DAY_RELATION_MAP[yao.d15] || '';
    //         const details = [];
    //
    //
    //
    //         const tombInfo = formatTombMask(yao.tombTargetMask);
    //
    //
    //
    //         let detailLine = '';
    //
    //
    //         if (yao.d === 1) details.push('暗动');
    //         if (monthDesc) details.push(monthDesc);
    //         if (dayDesc) details.push(dayDesc);
    //
    //         if (details.length > 0) {
    //             console.log(`     └─ 状态: ${details.join(', ')}`);
    //         }
    //
    //         if (tombInfo) {
    //             detailLine += (detailLine ? ' | ' : '') + tombInfo;
    //         }
    //         if (detailLine) {
    //             console.log(`     └─ ${detailLine}`);
    //         }
    //
    //         // 显示变爻的入墓信息
    //         if (yao.change && yao.change.tombTargetMask > 0) {
    //             const changeTombInfo = formatTombMask(yao.change.tombTargetMask);
    //             console.log(`     └─ 变爻 ${changeTombInfo}`);
    //         }
    //
    //
    //
    //         if (yao.exitEmpty) {
    //             const formatGanZhi = (gz) => Gan[gz[0]] + Zhi[gz[1]];
    //             const naturalStr = formatGanZhi(yao.exitEmpty.natural);
    //             const fillStr = Zhi[yao.exitEmpty.fill[1]];
    //             const clashStr = Zhi[yao.exitEmpty.clash[1]];
    //             console.log(`     └─ 出空: 自然(${naturalStr}) 填实(${fillStr}) 冲实(${clashStr})`);
    //         }
    //     }
    //     console.log('--------------------------------------------------');
    // }


    console() {
        const GP = ['- -', '---', '-x-', '-0-'];
        // 映射表：用于显示化废状态
        const WASTED_EVOLUTION_MAP = {
            2: '回头克',
            3: '化退',
            4: '化破'
        };
        // 映射表：用于爻位名称
        const YAO_NAMES = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

        /**
         * 辅助函数：将入墓掩码转换为可读字符串
         * @param {number} mask - 比特掩码
         * @returns {string} - 格式化后的字符串，如 "入墓: 初爻, 三爻"
         */
        const formatTombMask = (mask) => {
            if (mask === 0) return '';
            const targets = [];
            for (let i = 0; i < 6; i++) {
                if ((mask >> i) & 1) {
                    targets.push(YAO_NAMES[i]);
                }
            }
            return `此爻可墓: ${targets.join(', ')}`;
        };

        // --- 1. 打印卦的头部信息 ---
        console.log(Gan[this.month[0]] + Zhi[this.month[1]] + '月' + Gan[this.day[0]] + Zhi[this.day[1]] + '日');
        console.log(this.names().join("之"), Element[this.element]);
        console.log('--------------------------------------------------');

        // --- 2. 循环打印每一爻的信息 ---
        for (let i = 5; i >= 0; i--) {
            const yao = this.times[i];

            // --- 2a. 准备主信息行所需的数据 ---
            const sy = ['　', '应', '世'][yao.sy];
            const zhi = Zhi[yao.z];
            const r = Relations[yao.relation];
            const animal = Animals[yao.animal];
            const No = yao.no + 1;

            // 准备动变关系字符串
            let cz = '　', cr = '　', evolutionStr = '';
            if (yao.change) {
                cz = Zhi[yao.change.z];
                cr = Relations[yao.change.relation];

                let evolutionParts = [];
                if (yao.evolution === 1) evolutionParts.push('进');
                else if (yao.evolution === 3) evolutionParts.push('伏吟');
                else if (yao.evolution === 4) evolutionParts.push('反吟');

                if (yao.wastedEvolution > 1) {
                    evolutionParts.push(WASTED_EVOLUTION_MAP[yao.wastedEvolution]);
                }

                if (evolutionParts.length > 0) {
                    evolutionStr = '→ ' + evolutionParts.join(', ');
                }
            }

            // 准备旬空状态字符串
            let emptyStatus = '　　';
            if (Math.floor(yao.empty / 10) === 2) {
                emptyStatus = (yao.empty % 10 === 1) ? '真空' : '假空';
            }

            // 准备伏神字符串
            const fu = yao.peace.length ? '伏' + Zhi[yao.peace[0]] + Relations[yao.peace[1]] : '　　　';

            // --- 2b. 打印主信息行 ---
            console.log(`${No} ${sy} ${animal} ${r} ${GP[yao.type]} ${zhi} [${emptyStatus} ${fu}] ${cz} ${cr} ${evolutionStr}`);

            // --- 2c. 准备并打印附属信息行 ---

            // 收集所有附属信息
            const subDetails = [];
            const monthDesc = MONTH_RELATION_MAP[yao.m15] || '';
            const dayDesc = DAY_RELATION_MAP[yao.d15] || '';
            const tombInfo = formatTombMask(yao.tombTargetMask);

            if (yao.d === 1) subDetails.push('暗动');
            if (monthDesc) subDetails.push(monthDesc);
            if (dayDesc) subDetails.push(dayDesc);
            if (tombInfo) subDetails.push(tombInfo);

            // 统一打印本爻的附属信息
            if (subDetails.length > 0) {
                console.log(`     └─ ${subDetails.join(' | ')}`);
            }

            // 打印变爻的入墓信息 (独立行)
            if (yao.change && yao.change.tombTargetMask > 0) {
                const changeTombInfo = formatTombMask(yao.change.tombTargetMask);
                console.log(`     └─ 变爻 ${changeTombInfo}`);
            }

            // 打印出空信息 (独立行)
            if (yao.exitEmpty) {
                const formatGanZhi = (gz) => Gan[gz[0]] + Zhi[gz[1]];
                const naturalStr = formatGanZhi(yao.exitEmpty.natural);
                const fillStr = Zhi[yao.exitEmpty.fill[1]];
                const clashStr = Zhi[yao.exitEmpty.clash[1]];
                console.log(`     └─ 出空: 自然(${naturalStr}) 填实(${fillStr}) 冲实(${clashStr})`);
            }
        }
        console.log('--------------------------------------------------');
    }



    stringify() {
        return {

        }
    }

}



