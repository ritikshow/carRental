import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { faLocation, faShop, faBoxes, faMoneyBill, faCar } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cars: any;
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;
  faCar = faCar;
  AllCount:any
  charts: any;


  
  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Month wise sales'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in $'
      }
    },
    series: [
      {
        name: "Arizona",
        type: "line",
        color: '#044342',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
      },
      {
        name: 'Connecticut',
        type: 'line',
        color: '#7e0505',
        data: [
          47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
        ]
      },
      {
        name: 'Ohio',
        type: 'line',
        color: '#ed9e20',
        data: [
          17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
        ]
      },
    ],
    credits: {
      enabled: false
    }
  })

  //==========================
  initializeChart() {
  this.charts = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Booking Type'
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Indivisual',
            y: this.AllCount?.bookingfor?.indiviusal || 0,
            color: '#044342',
          },
          {
            name: 'Company',
            y: this.AllCount?.bookingfor?.company || 0,
            color: '#7e0505',
          }
        ]
      }
    ],
    credits: {
      enabled: false
    }
  });
}
  //==============================================

   transactions = [
    {
      id: 1,
      title: "Honda",
      price: "$299",
      shop: "SScarRental",
      location: "East Hartford",
      status: "pending",
       imgSrc: "assets/Logo/car2.jpg"   
        },
    {
      id: 2,
      title: "Bellono",
      price: "$7.89",
      shop: "SScarRental",
      location: "Miamisburg",
      status: "shipped",
      imgSrc: "assets/Logo/car2.jpg"
    },
    {
      id: 3,
      title: "Dezire",
      price: "$69",
      shop: "SSCarRental",
      location: "Phoenix",
      status: "confirmed",
      imgSrc: "assets/Logo/car2.jpg"
      
    }
  ];

  //
  
  TopThree = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Top 3 Products'
    },
    xAxis: {
      categories: [
        'Lenova Thinkpad E15',
        'Nectar Orange Juice',
        'Axe Deodarant',
      ]
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
     {
      type: 'bar',
      showInLegend: false,
      data: [
        {
          name: 'Lenova Thinkpad E15',
          y: 395,
          color: '#044342',
        },
        {
          name: 'Nectar Orange Juice',
          y: 385,
          color: '#7e0505',
        },
        {
          name: 'Axe Deodarant',
          y: 275,
          color: '#ed9e20',
        },
      ]
     }
    ],
    credits: {
      enabled: false
    }
  })


  constructor(
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
   this.GetTotalCount();
  }
  
  GetTotalCount(){
    this.api.GetAllCount().subscribe({next:(res:any)=>{
      this.AllCount = res;
      console.log("Data",this.AllCount)
      this.initializeChart();
    }})
  }

  
}
