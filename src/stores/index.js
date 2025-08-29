// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'
// import dayjs from 'dayjs';
//
// export const useQimenStore = defineStore('qimenpan', () => {
//     const panData = ref(null) // 将初始值改为null，表示没有数据
//     const formattedPanData = ref(null) // 新增一个ref来存储格式化后的数据
//
//     function setPanData(data) {
//         panData.value = data;
//         formattedPanData.value = formatQimenData(data);
//     }
//
//     // 根据八卦获取对应宫的信息
//     function getGongViewData(bagua) {
//         return computed(() => {
//             if (panData.value && panData.value['門']) {
//                 return {
//                     八门: panData.value['門'][bagua],
//                     八神: panData.value['神'][bagua],
//                     九星: panData.value['星'][bagua],
//                     八卦: bagua,
//                     天盘: panData.value['天盤'][0][bagua],
//                     天盘1: panData.value['天盤'][1][bagua],
//                     地盘: panData.value['地盤'][bagua],
//                     暗干: panData.value['暗干'][bagua],
//                 }
//             } else {
//                 return {}
//             }
//         })
//     }
//
//     // 格式化奇门数据为用户要求的JSON结构
//     function formatQimenData(rawData) {
//         if (!rawData) return null;
//
//         const gongPositions = {
//             "乾": "northwest",
//             "坎": "north",
//             "艮": "northeast",
//             "震": "east",
//             "巽": "southeast",
//             "離": "south",
//             "坤": "southwest",
//             "兌": "west",
//             "中": "center" // 中宫可能没有明确方位，但为了完整性可以加上
//         };
//
//         const palaces = {};
//         const eightGua = ["乾", "坎", "艮", "震", "巽", "離", "坤", "兌"];
//
//         eightGua.forEach(gong => {
//             // 安全地访问天盘、地盘和星盘数据
//             const heavenStem = rawData['天盤'] && rawData['天盤'][0] ? rawData['天盤'][0][gong] : '';
//             // 修正地盘干支的访问路径
//             const earthStem = rawData['地盤'] ? rawData['地盤'][gong] : '';
//             // 修正九星数据的访问路径 - 直接访问星盘数据
//             const star = rawData['星'] ? rawData['星'][gong] : '';
//
//             const lifeCycleHeaven = {};
//             if (rawData['長生運'] && rawData['長生運']['天盤'] && rawData['長生運']['天盤'][gong] && heavenStem) {
//                 lifeCycleHeaven[heavenStem] = Object.entries(rawData['長生運']['天盤'][gong][heavenStem] || {}).map(([branch, stage]) => ({ stage, branch }));
//             }
//
//             const lifeCycleEarth = {};
//             if (rawData['長生運'] && rawData['長生運']['地盤'] && rawData['長生運']['地盤'][gong] && earthStem) {
//                 lifeCycleEarth[earthStem] = Object.entries(rawData['長生運']['地盤'][gong][earthStem] || {}).map(([branch, stage]) => ({ stage, branch }));
//             }
//
//             palaces[gong] = {
//                 position: gongPositions[gong] || '',
//                 heaven_stem: heavenStem,
//                 earth_stem: earthStem,
//                 gate: rawData['門'] ? rawData['門'][gong] || '' : '',
//                 star: star,
//                 spirit: rawData['神'] ? rawData['神'][gong] || '' : '',
//                 hidden_stem: rawData['暗干'] ? rawData['暗干'][gong] || '' : '',
//                 life_cycle: {
//                     heaven: lifeCycleHeaven,
//                     earth: lifeCycleEarth
//                 }
//             };
//         });
//
//         return {
//             metadata: {
//                 timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss'), // 使用当前时间
//                 solar_term: rawData['節氣'] || '',
//                 gan_zhi: {
//                     year: rawData['干支1'] ? rawData['干支1']['年'] || '' : '',
//                     month: rawData['干支1'] ? rawData['干支1']['月'] || '' : '',
//                     day: rawData['干支1'] ? rawData['干支1']['日'] || '' : '',
//                     hour: rawData['干支1'] ? rawData['干支1']['時'] || '' : ''
//                 },
//                 bureau_type: rawData['排局'] || '',
//                 void_periods: {
//                     day_void: rawData['旬空'] ? rawData['旬空']['日空'] || [] : [],
//                     hour_void: rawData['旬空'] ? rawData['旬空']['時空'] || [] : []
//                 }
//             },
//             control_points: {
//                 zhi_fu: {
//                     star: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][0] || '' : '',
//                     palace: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][1] || '' : ''
//                 },
//                 zhi_shi: {
//                     gate: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][0] || '' : '',
//                     palace: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][1] || '' : ''
//                 }
//             },
//             palaces: palaces,
//             special_stars: {
//                 天馬: rawData['馬星']['天馬'] || '',
//                 丁馬: rawData['馬星']['丁馬'] || '',
//                 驛馬: rawData['馬星']['驛馬'] || ''
//             }
//         };
//     }
//
//     return { panData, formattedPanData, getGongViewData, setPanData }
// })


// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'
// import dayjs from 'dayjs';
//
// export const useQimenStore = defineStore('qimenpan', () => {
//     const panData = ref(null) // 将初始值改为null，表示没有数据
//     const formattedPanData = ref(null) // 新增一个ref来存储格式化后的数据
//
//     function setPanData(data) {
//         panData.value = data;
//         formattedPanData.value = formatQimenData(data);
//     }
//
//     // 根据八卦获取对应宫的信息
//     function getGongViewData(bagua) {
//         return computed(() => {
//             if (panData.value && panData.value['門']) {
//                 return {
//                     八门: panData.value['門'][bagua],
//                     八神: panData.value['神'][bagua],
//                     九星: panData.value['星'][bagua],
//                     八卦: bagua,
//                     天盘: panData.value['天盤'][0][bagua],
//                     天盘1: panData.value['天盤'][1][bagua],
//                     地盘: panData.value['地盤'][bagua],
//                     暗干: panData.value['暗干'][bagua],
//                     // 新增的宫位状态信息
//                     宫位五行: panData.value['宫位五行'] ? panData.value['宫位五行'][bagua] : '',
//                     空亡: panData.value['空亡'] ? panData.value['空亡'][bagua] : false,
//                     门迫: panData.value['門迫'] ? panData.value['門迫'][bagua] : false,
//                     六击: panData.value['六击'] ? panData.value['六击'][bagua] : false,
//                 }
//             } else {
//                 return {}
//             }
//         })
//     }
//
//     // 格式化奇门数据为用户要求的JSON结构
//     function formatQimenData(rawData) {
//         if (!rawData) return null;
//
//         const gongPositions = {
//             "乾": "northwest",
//             "坎": "north",
//             "艮": "northeast",
//             "震": "east",
//             "巽": "southeast",
//             "離": "south",
//             "坤": "southwest",
//             "兌": "west",
//             "中": "center" // 中宫可能没有明确方位，但为了完整性可以加上
//         };
//
//         const palaces = {};
//         const eightGua = ["乾", "坎", "艮", "震", "巽", "離", "坤", "兌"];
//
//         eightGua.forEach(gong => {
//             // 安全地访问天盘、地盘和星盘数据
//             const heavenStem = rawData['天盤'] && rawData['天盤'][0] ? rawData['天盤'][0][gong] : '';
//             // 修正地盘干支的访问路径
//             const earthStem = rawData['地盤'] ? rawData['地盤'][gong] : '';
//             // 修正九星数据的访问路径 - 直接访问星盘数据
//             const star = rawData['星'] ? rawData['星'][gong] : '';
//
//             const lifeCycleHeaven = {};
//             if (rawData['長生運'] && rawData['長生運']['天盤'] && rawData['長生運']['天盤'][gong] && heavenStem) {
//                 lifeCycleHeaven[heavenStem] = Object.entries(rawData['長生運']['天盤'][gong][heavenStem] || {}).map(([branch, stage]) => ({ stage, branch }));
//             }
//
//             const lifeCycleEarth = {};
//             if (rawData['長生運'] && rawData['長生運']['地盤'] && rawData['長生運']['地盤'][gong] && earthStem) {
//                 lifeCycleEarth[earthStem] = Object.entries(rawData['長生運']['地盤'][gong][earthStem] || {}).map(([branch, stage]) => ({ stage, branch }));
//             }
//
//             palaces[gong] = {
//                 position: gongPositions[gong] || '',
//                 heaven_stem: heavenStem,
//                 earth_stem: earthStem,
//                 gate: rawData['門'] ? rawData['門'][gong] || '' : '',
//                 star: star,
//                 spirit: rawData['神'] ? rawData['神'][gong] || '' : '',
//                 hidden_stem: rawData['暗干'] ? rawData['暗干'][gong] || '' : '',
//                 life_cycle: {
//                     heaven: lifeCycleHeaven,
//                     earth: lifeCycleEarth
//                 },
//                 // 新增的宫位状态信息
//                 palace_attributes: {
//                     five_element: rawData['宫位五行'] ? rawData['宫位五行'][gong] || '' : '', // 宫位五行
//                     is_void: rawData['空亡'] ? rawData['空亡'][gong] || false : false,        // 是否空亡
//                     is_gate_pressed: rawData['門迫'] ? rawData['門迫'][gong] || false : false, // 是否门迫
//                     is_stem_punished: rawData['六击'] ? rawData['六击'][gong] || false : false  // 是否天干击刑
//                 },
//                 // 可选：添加更详细的状态描述
//                 status_description: {
//                     void_status: rawData['空亡'] && rawData['空亡'][gong] ? '空亡' : '不空亡',
//                     gate_status: rawData['門迫'] && rawData['門迫'][gong] ? '门迫' : '不门迫',
//                     punishment_status: rawData['六击'] && rawData['六击'][gong] ? '六击' : '不六击'
//                 }
//             };
//         });
//
//         // 添加全局状态统计
//         const globalStatus = {
//             void_palaces: [],      // 空亡的宫位
//             pressed_palaces: [],   // 门迫的宫位
//             punished_palaces: []   // 六击的宫位
//         };
//
//         eightGua.forEach(gong => {
//             if (rawData['空亡'] && rawData['空亡'][gong]) {
//                 globalStatus.void_palaces.push(gong);
//             }
//             if (rawData['門迫'] && rawData['門迫'][gong]) {
//                 globalStatus.pressed_palaces.push(gong);
//             }
//             if (rawData['六击'] && rawData['六击'][gong]) {
//                 globalStatus.punished_palaces.push(gong);
//             }
//         });
//
//         return {
//             metadata: {
//                 timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss'), // 使用当前时间
//                 solar_term: rawData['節氣'] || '',
//                 gan_zhi: {
//                     year: rawData['干支1'] ? rawData['干支1']['年'] || '' : '',
//                     month: rawData['干支1'] ? rawData['干支1']['月'] || '' : '',
//                     day: rawData['干支1'] ? rawData['干支1']['日'] || '' : '',
//                     hour: rawData['干支1'] ? rawData['干支1']['時'] || '' : ''
//                 },
//                 bureau_type: rawData['排局'] || '',
//                 void_periods: {
//                     day_void: rawData['旬空'] ? rawData['旬空']['日空'] || [] : [],
//                     hour_void: rawData['旬空'] ? rawData['旬空']['時空'] || [] : []
//                 }
//             },
//             control_points: {
//                 zhi_fu: {
//                     star: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][0] || '' : '',
//                     palace: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][1] || '' : ''
//                 },
//                 zhi_shi: {
//                     gate: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][0] || '' : '',
//                     palace: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][1] || '' : ''
//                 }
//             },
//             palaces: palaces,
//             special_stars: {
//                 天馬: rawData['馬星']['天馬'] || '',
//                 丁馬: rawData['馬星']['丁馬'] || '',
//                 驛馬: rawData['馬星']['驛馬'] || ''
//             },
//             // 新增：全局状态统计
//             global_status: globalStatus
//         };
//     }
//
//     return { panData, formattedPanData, getGongViewData, setPanData }
// })


import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs';

export const useQimenStore = defineStore('qimenpan', () => {
    const panData = ref(null)
    const formattedPanData = ref(null)

    function setPanData(data) {
        panData.value = data;
        formattedPanData.value = formatQimenData(data);
    }

    function getGongViewData(bagua) {
        return computed(() => {

            // // 地支对应宫位的映射
            // const 地支宫位映射 = {
            //     "子": "坎",
            //     "丑": "艮", "寅": "艮",
            //     "卯": "震",
            //     "辰": "巽", "巳": "巽",
            //     "午": "離",
            //     "未": "坤", "申": "坤",
            //     "酉": "兌",
            //     "戌": "乾", "亥": "乾"
            // };
            // // 获取驿马地支
            // const 驿马地支 = panData.value['馬星'] ? panData.value['馬星']['驛馬'] : null;
            // // 转换为对应宫位
            // const 驿马宫位 = 驿马地支 ? 地支宫位映射[驿马地支] : null;
            //
            //


            // if (!panData.value || !panData.value['門']) {
            //     // 数据还没来，先给一份空壳，避免模板报错
            //     return {
            //         八门: '',
            //         八神: '',
            //         九星: '',
            //         八卦: bagua,
            //         天盘: '',
            //         天盘1: '',
            //         地盘: '',
            //         暗干: '',
            //         宫位五行: '',
            //         空亡: false,
            //         门迫: false,
            //         驛馬: false,          // 关键
            //     };
            // }
            //
            // // 正常数据
            // const horseBranch = panData.value['馬星']?.['驛馬'] ?? '';
            // const horseGong = {
            //     子: '坎', 丑: '艮', 寅: '艮', 卯: '震', 辰: '巽', 巳: '巽',
            //     午: '離', 未: '坤', 申: '坤', 酉: '兌', 戌: '乾', 亥: '乾',
            // }[horseBranch] ?? '';
            //


            if (panData.value && panData.value['門']) {
                return {
                    八门: panData.value['門'][bagua],
                    八神: panData.value['神'][bagua],
                    九星: panData.value['星'][bagua],
                    八卦: bagua,
                    天盘: panData.value['天盤'][0][bagua],
                    天盘1: panData.value['天盤'][1][bagua],
                    地盘: panData.value['地盤'][bagua],
                    暗干: panData.value['暗干'][bagua],

                    // 宫位级别的状态信息
                    宫位五行: panData.value['宫位五行'] ? panData.value['宫位五行'][bagua] : '',
                    空亡: panData.value['空亡'] ? panData.value['空亡'][bagua] : false,
                    门迫: panData.value['門迫'] ? panData.value['門迫'][bagua] : false,

                    // 修正驛馬判断逻辑
                    // 驛馬: 驿马宫位 === bagua

                }
            } else {
                return {}
            }
        })
    }

    function formatQimenData(rawData) {
        if (!rawData) return null;

        const gongPositions = {
            "乾": "northwest", "坎": "north", "艮": "northeast", "震": "east",
            "巽": "southeast", "離": "south", "坤": "southwest", "兌": "west",
            "中": "center"
        };

        const palaces = {};
        const eightGua = ["乾", "坎", "艮", "震", "巽", "離", "坤", "兌"];

        eightGua.forEach(gong => {
            const heavenStem = rawData['天盤'] && rawData['天盤'][0] ? rawData['天盤'][0][gong] : '';
            const earthStem = rawData['地盤'] ? rawData['地盤'][gong] : '';
            const star = rawData['星'] ? rawData['星'][gong] : '';

            // 处理天盘生旺墓信息，同时加入六击信息
            const lifeCycleHeaven = {};
            if (rawData['長生運'] && rawData['長生運']['天盤'] && rawData['長生運']['天盤'][gong] && heavenStem) {
                // 获取原有的生旺墓信息
                const originalLifeCycle = Object.entries(rawData['長生運']['天盤'][gong][heavenStem] || {}).map(([branch, stage]) => ({
                    stage,
                    branch,
                    // 为每个生旺墓条目添加六击信息
                    heaven_stem_punishment_desc: rawData['六击'] && rawData['六击'][gong] ? '六击' : '不六击'
                }));

                lifeCycleHeaven[heavenStem] = originalLifeCycle;
            } else if (heavenStem) {
                // 如果没有生旺墓信息，但有天干，仍然要添加六击信息
                lifeCycleHeaven[heavenStem] = [{
                    heaven_stem_punishment_desc: rawData['六击'] && rawData['六击'][gong] ? '六击' : '不六击',
                    stage: "",
                    branch: ""
                }];
            }

            // 处理地盘生旺墓信息（保持原有逻辑）
            const lifeCycleEarth = {};
            if (rawData['長生運'] && rawData['長生運']['地盤'] && rawData['長生運']['地盤'][gong] && earthStem) {
                lifeCycleEarth[earthStem] = Object.entries(rawData['長生運']['地盤'][gong][earthStem] || {}).map(([branch, stage]) => ({ stage, branch }));
            }

            palaces[gong] = {
                position: gongPositions[gong] || '',
                heaven_stem: heavenStem,
                earth_stem: earthStem,
                gate: rawData['門'] ? rawData['門'][gong] || '' : '',
                star: star,
                spirit: rawData['神'] ? rawData['神'][gong] || '' : '',
                hidden_stem: rawData['暗干'] ? rawData['暗干'][gong] || '' : '',

                // 宫位级别的属性
                five_element: rawData['宫位五行'] ? rawData['宫位五行'][gong] || '' : '',
                is_void: rawData['空亡'] ? rawData['空亡'][gong] || false : false,
                is_gate_pressed: rawData['門迫'] ? rawData['門迫'][gong] || false : false,

                // 生旺墓信息（天盘包含六击信息）
                life_cycle: {
                    heaven: lifeCycleHeaven,
                    earth: lifeCycleEarth
                }
            };
        });

        return {
            metadata: {
                timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
                solar_term: rawData['節氣'] || '',
                gan_zhi: {
                    year: rawData['干支1'] ? rawData['干支1']['年'] || '' : '',
                    month: rawData['干支1'] ? rawData['干支1']['月'] || '' : '',
                    day: rawData['干支1'] ? rawData['干支1']['日'] || '' : '',
                    hour: rawData['干支1'] ? rawData['干支1']['時'] || '' : ''
                },
                bureau_type: rawData['排局'] || '',
                void_periods: {
                    day_void: rawData['旬空'] ? rawData['旬空']['日空'] || [] : [],
                    hour_void: rawData['旬空'] ? rawData['旬空']['時空'] || [] : []
                }
            },
            control_points: {
                zhi_fu: {
                    star: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][0] || '' : '',
                    palace: rawData['值符值使'] && rawData['值符值使']['值符星宮'] ? rawData['值符值使']['值符星宮'][1] || '' : ''
                },
                zhi_shi: {
                    gate: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][0] || '' : '',
                    palace: rawData['值符值使'] && rawData['值符值使']['值使門宮'] ? rawData['值符值使']['值使門宮'][1] || '' : ''
                }
            },
            palaces: palaces,
            special_stars: {
                //天馬: rawData['馬星']['天馬'] || '',
                //丁馬: rawData['馬星']['丁馬'] || '',
                驛馬: rawData['馬星']['驛馬'] || ''
            }
        };
    }

    return { panData, formattedPanData, getGongViewData, setPanData }
})
