import { Component, Inject, NgZone, PLATFORM_ID, Input, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { PrescribedDataService } from '../../../services/prescribed-data.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, AfterViewInit {
  private root!: am5.Root;
  @Input() prescribedTestData: any = [];

  latestInputData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private prescribeDtService: PrescribedDataService) { }



  ngOnInit(): void {
    this.prescribeDtService.getValue().subscribe((res) => {
      this.latestInputData = res;
      this.createChart(res)

    }, err => {
      console.log(err);

    })
  }
  filterData(data: []): [] {
    let count: any = {}, chartData: any = [];
    data.forEach(element => {
      count[element['prescribedTest']] = (count[element['prescribedTest']] || 0) + 1;
    });
    console.log(count);
    for (const key in count) {
      chartData.push({
        prescribedTest: key,
        counts: count[key]
      })
    }
    return chartData;
  }

  createChart(data: any) {
    if (data != null) {
      let chartData = this.filterData(data)


      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "counts",
          categoryField: "prescribedTest"
        })
      );
      series.data.setAll(chartData);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
      }));

      legend.data.setAll(series.dataItems);

      this.root = root;



    }
  }


  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    /*
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      );

      // Define data
      if (this.latestInputData) {
        console.log(this.latestInputData);

      }

      let data = [{
        prescribedTest: "Chemistry",
        counts: 5
      }, {
        prescribedTest: "RTC",
        counts: 10
      }, {
        prescribedTest: "CBC",
        counts: 20
      }];

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "counts",
          categoryField: "prescribedTest"
        })
      );
      series.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
      }));

      legend.data.setAll(series.dataItems);

      this.root = root;
    });

    */
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
