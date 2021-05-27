/*
 * @Author: wangshan
 * @Date: 2021-05-27 23:51:00
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-27 23:53:06
 * @Description:
 */
// prop
import Component, { mixins } from 'vue-class-component';
import { Pie, mixins as mixin } from 'vue-chartjs';

@Component({
  extends: Pie,
  mixins: [mixin.reactiveProp]
})
export default class CommitChart extends mixins(mixin.reactiveProp, Pie) {
  init = 0;
  mounted() {
    (this as any).renderChart((this as any).chartData, (this as any).options);
  }
}
