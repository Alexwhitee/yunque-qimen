import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs';

export const useQimenStore = defineStore('qimenpan', () => {
    const panData = ref(null) // 将初始值改为null，表示没有数据
    const formattedPanData = ref(null) // 新增一个ref来存储格式化后的数据

    function setPanData(data) {
        panData.value = data;
        formattedPanData.value = formatQimenData(data);
    }

    // 根据八卦获取对应宫的信息
    function getGongViewData(bagua) {
        return computed(() => {
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
                }
            } else {
                return {}
            }
        })
    }

    // 格式化奇门数据为用户要求的JSON结构
    function formatQimenData(rawData) {
        if (!rawData) return null;

        const gongPositions = {
            "乾": "northwest",
            "坎": "north",
            "艮": "northeast",
            "震": "east",
            "巽": "southeast",
            "離": "south",
            "坤": "southwest",
            "兌": "west",
            "中": "center" // 中宫可能没有明确方位，但为了完整性可以加上
        };

        const palaces = {};
        const eightGua = ["乾", "坎", "艮", "震", "巽", "離", "坤", "兌"];

        eightGua.forEach(gong => {
            // 安全地访问天盘、地盘和星盘数据
            const heavenStem = rawData['天盤'] && rawData['天盤'][0] ? rawData['天盤'][0][gong] : '';
            // 修正地盘干支的访问路径
            const earthStem = rawData['地盤'] ? rawData['地盤'][gong] : '';
            // 修正九星数据的访问路径 - 直接访问星盘数据
            const star = rawData['星'] ? rawData['星'][gong] : '';

            const lifeCycleHeaven = {};
            if (rawData['長生運'] && rawData['長生運']['天盤'] && rawData['長生運']['天盤'][gong] && heavenStem) {
                lifeCycleHeaven[heavenStem] = Object.entries(rawData['長生運']['天盤'][gong][heavenStem] || {}).map(([branch, stage]) => ({ stage, branch }));
            }

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
                life_cycle: {
                    heaven: lifeCycleHeaven,
                    earth: lifeCycleEarth
                }
            };
        });

        return {
            metadata: {
                timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss'), // 使用当前时间
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
                天馬: rawData['馬星']['天馬'] || '',
                丁馬: rawData['馬星']['丁馬'] || '',
                驛馬: rawData['馬星']['驛馬'] || ''
            }
        };
    }

    return { panData, formattedPanData, getGongViewData, setPanData }
})