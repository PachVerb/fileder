/*
 * @Author: wangshan
 * @Date: 2021-05-26 23:59:15
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-27 23:09:03
 * @Description:
 */
import Component, { mixins } from 'vue-class-component';
import { Bar, mixins as mixin } from 'vue-chartjs';

@Component({
  extends: Bar, // this is important to add the functionality to your component
  mixins: [mixin.reactiveProp]
})
export default class CommitChart extends mixins(mixin.reactiveProp, Bar) {
  init = 0;
  mounted() {
    // console.log(this);
    // Overwriting base render method with actual data.
    (this as any).renderChart((this as any).chartData, (this as any).options);
  }
}
