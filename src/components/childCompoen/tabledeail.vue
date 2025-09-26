<template>
    <div class="compared-cell">
        <!-- coukey:需要对比字段 couvalue:取值映射对象 -->
        <div v-if="isenableCompare">
            <span :class="{'has-link': enableDetail && hasDetailData}"
                  @click="handleClickCell">{{getValue}}</span>
            <!-- 符号"-"存在取值，趋势下降 -->
            <span v-if="isDown">
                <i :class="{upred:haveRate,upgreen:!haveRate}"
                   class="el-icon-bottom "></i>
                <span :class="{upred:haveRate,upgreen:!haveRate}">
                    {{formatTableValue(comparedValue,haveRate)}}
                </span>
            </span>

            <!-- 符号"+"存在取值，趋势上升 -->
            <span v-else-if="isUp">
                <i :class="{upred:!haveRate,upgreen:haveRate}"
                   class="el-icon-top"></i>
                <span :class="{upred:!haveRate,upgreen:haveRate}">
                    {{formatTableValue(comparedValue,haveRate)}}
                </span>
            </span>

            <!-- 符号"0%"存在取值，趋势不变 -->
            <span v-else>
                <i style="font-weight:600;color:#0d867f;margin: 0 10px"
                   class="el-icon-minus"></i>
                <span class="compared-value">{{formatTableValue(comparedValue,haveRate)}}</span>
            </span>

        </div>
        <!--        <span v-show="!form.statisticsComparison">{{getValue}}</span>-->
        <span @click="handleClickCell"
              :class="{'has-link': enableDetail && hasDetailData}"
              v-else>{{getValue}}</span>
    </div>

</template>

<script>
export default {
    name: 'TableCell',
    props: {
        enablePercentage: {
            type: Boolean,
            default() {
                return false;
            }
        },
        enableCompare: {
            type: Boolean,
            default() {
                return false;
            }
        },
        value: {
            type: [String, Number, undefined, null],
            default() {
                return '';
            }
        },
        comparedValue: {
            type: [String, Number, undefined, null],
            default() {
                return '';
            }
        },
        row: {
            type: Object,
            default() {
                return null;
            }
        },
        cell: {
            type: Object,
            default() {
                return null;
            }
        },
        enableDetail: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    created() {
        // console.log(this.enableCompare, this.row, this.value, this.comparedValue, this.cell.prop);
    },
    computed: {
        getValue() {
            if (!this.isBlank(this.value)) {
                return this.haveRate ? `${this.value}%` : this.value;
            } else {
                return '/';
            }
        },
        hasDetailData() {
            return Number(this.value) > 0;
        },
        haveRate() {
            return this.enablePercentage || String(this.cell.prop).toLowerCase().includes('bfb');
        },
        getCompareValue() {
            const numerical = Number(this.comparedValue);
            if (Number.isNaN(numerical)) {
                return 0;
            } else {
                return numerical;
            }
        },
        isenableCompare() {
            return this.enableCompare;
        },
        isDown() {
            return this.getCompareValue < 0;
        },
        isUp() {
            return this.getCompareValue > 0;
        }
    },
    methods: {
        /**
         * 空白
         * @param value
         * @return {boolean|boolean}
         */
        isBlank(value) {
            const isEmpty = value === '';
            const isUndefined = typeof value === 'undefined';
            const isNaN = Number.isNaN(value);
            const isNull = typeof value === 'object' && !value;
            return isEmpty || isUndefined || isNull || isNaN;
        },

        handleClickCell() {
            if (this.enableDetail && this.hasDetailData) {
                this.$emit('click', this.row, this.cell);
            }

            // handleRowClick(row,{type:'ConrainProblem',value:item.prop})
        },

        //处理表格值
        formatTableValue(value, isHave) {
            if (this.isBlank(value)) {
                return '/';
            }
            const numericValue = Math.abs(value);
            if (Number.isNaN(numericValue)) {
                return '/';
            }
            if (isHave) {
                return numericValue.toFixed(2) + '%';
            } else {
                return numericValue;
            }
        },

        getIconValue(flag) {
            const value = String(this.getValue);
            return value ? value.split(flag)[1] : '';
        }
    }
};
</script>

<style  scoped>
.upred {
    color: red;
    font-weight: 600;
    margin-left: 6px;
    font-size: 10px;
}
.upgreen {
    color: green;
    font-weight: 600;
    margin-left: 4px;
    font-size: 10px;
}
.has-link {
    text-decoration: underline;
    cursor: pointer;
}
.compared-value {
    font-weight: 600;
    margin-left: 10px;
    font-size: 10px;
}
</style>
