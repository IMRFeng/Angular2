export class Person {
  Id: number;
  FullName: string;
  Weights: Weight[];
}

export class Weight {
  Id: number;
  Kg: number;
  Date: Date;
  PersonId: number;
}

export class Chart {
  chartData: Array<any>;
  chartLabels: Array<any>;
  chartSeries: Array<any>;
  chartColors: Array<any>;
  chartType: string;
  chartOptions: any;
  lineChartLegend: boolean;
}