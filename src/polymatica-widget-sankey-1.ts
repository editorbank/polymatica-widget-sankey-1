import {
    Chart,
    LinearScale,
  } from 'chart.js';
  Chart.register(
    LinearScale,
  );
  
  import {
    SankeyController,
    Flow,
  } from 'chartjs-chart-sankey';
  Chart.register(
    SankeyController,
    Flow,
  );
  
  import { ISankeyData, ISankeyLink } from './ISankeyData';
  import { Dictionary } from "lodash";
  
  import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';


@Declare({
    provideCssVariables: true,
})
export class Column extends Widget implements SingleData {
    readonly data!: SingleData['data'];
    readonly dataSettings!: SingleData['dataSettings'];

    private _canvas: any;
    // private ct: CanvasTools;

    constructor(){
        super();
    }

    private _resizeAndDraw(){
        console.log('debug _onResizeWindow()');
        if(this._canvas){
            this._canvas.width=this._canvas.parentElement.clientWidth;
            this._canvas.height=this._canvas.parentElement.clientHeight;
        }
        this._drawChart();

    }
   
    private _cart_data: ISankeyData;
    private getColorByData(key: string): string{
        var ret = (this._colors )?.[key];
        return ret ? ret : 'gray'
    }


    private _drawChart(){
        console.log('debug _drawChart()');

        
        if(this._chart) {
            this._chart.destroy()
            this._chart=undefined
        }

        //*
        if(!this._chart) {
            console.log('chart create');
            Chart.defaults.font = {
                family:this.viewSettings._TextFamily,
                size: parseFloat(this.viewSettings._TextSize) || 20,
                style: this.viewSettings._TextStyle || 'normal',
            };
            this._chart = new Chart(this._canvas.getContext('2d'), {
                type: 'sankey',
                data: {
                  datasets: [
                    {
                      color: this.viewSettings._TextColor || 'gray',
                      borderWidth: parseInt(this.viewSettings._NodesBorderValue) || 0,
                      borderColor: this.viewSettings._NodesBorderColor || 'transparent',
                      data: this._cart_data.links,
                      colorFrom: (config) => this.getColorByData(config.dataset.data[config.dataIndex].from),
                      colorTo: (config) => this.getColorByData(config.dataset.data[config.dataIndex].to),
                      colorMode: this.viewSettings.colorMode,
                      labels: {},
                      priority: {},
                      size: this.viewSettings.preferredFlowOverlap,
                    },
                  ]
                },
            });
        } else {
            console.log('chart update');
            
            this._chart.draw()
        }    
        //*/
        // this.ct._saveImage();
    }

    private _chart :Chart<'sankey'> = undefined;
    private _colors :Dictionary<string> = {};


    private _prepareColors(): void {
        console.log('debug _prepareColors()');
        var i=0;
        for(var key in this._colors){
            this._colors[key]=this.theme.colors[i];
            i=(++i)%this.theme.colors.length;
        }
        // console.log(this._colors);
    }

    private _prepareData(): void {
        console.log('debug _prepareData()');
        
        // this.endIndexForFilter = this.getNonFilteredEndIndex();

        if(!this._cart_data) this._cart_data={
            links:[]
        };
        this._cart_data.links = this.data.map((v,i,a)=>{
            var from = v[this.dataSettings?.columnsByBlock?.FROM?.[0]?.path];
            var to = v[this.dataSettings?.columnsByBlock?.TO?.[0]?.path];
            var flow = v[this.dataSettings?.columnsByBlock?.FLOW[0]?.path];
            this._colors[from]='gray';
            this._colors[to]='gray';
            var link:ISankeyLink ={ from: from, to: to, flow: flow || 1 };
            // console.log(link);
            return link;
        });
    }
    
    

    onLangChange(): void {
        console.log('debug onLangChange()');
        this._drawChart();
    }

    onThemeChange(): void {
        console.log('debug onThemeChange()');
        this._prepareColors();
        this._drawChart();
    }

    private _old_dataSettings = '';

    onChange(): void {
        
        console.log('debug onChange()');
        var current_dataSettings = JSON.stringify(this.dataSettings.columnsByBlock);
        if(this._old_dataSettings !== current_dataSettings){
            this._prepareData();
            this._prepareColors();
            this._old_dataSettings = current_dataSettings;
        }

        this._resizeAndDraw();
        this.ready();
    }

    onInit(): void {
        console.log('debug onInit()');
        // const container = document.getElementById('chart');
        // container.addEventListener('mousedown', () => {});
        // container.addEventListener('mousemove', () => {});
        this.dataSettings.events.onOtherFilterChange = (filter) => {
            console.log('onOtherFilterChange');
        };
        this.dataSettings.events.onOtherFilterChange = (filter) => {
            console.log('onOtherFilterChange');
        };
        

        if(!this._canvas) this._canvas = document.getElementById('chart') as HTMLCanvasElement;
        // this.ct = new CanvasTools(this._canvas);
        if(!this._cart_data) this._cart_data={};
        if(!this._cart_data.links) this._cart_data.links=[];


        window.addEventListener('resize', ( )=>this._resizeAndDraw(), false);



        // this._canvas.onclick = ((ev: MouseEvent)=>{
        //     console.log('debug onclick() '+ev.clientX+'x'+ev.clientY)
        //     this.ct._debugObject(this);

        // });
        // this._canvas.onmouseover = ((ev: MouseEvent)=>{
        //     console.log('debug onmouseover() '+ev.clientX+'x'+ev.clientY)
        //     this.ct._saveImage();
        // });
        // this._canvas.onmouseout = ((ev: MouseEvent)=>{
        //     console.log('debug onmouseout() '+ev.clientX+'x'+ev.clientY);
        //     this.ct._restoreImage();
        // });
        
        // this._canvas.onmousemove = ((ev: MouseEvent)=>{
        //     //console.log('debug onmousemove() '+ev.clientX+'x'+ev.clientY);
        //     this.ct._restoreImage();
        //     this.ct._drawCross(ev.clientX,ev.clientY,'yellow')
        // });
        // this._canvas.onmousedown = ((ev: MouseEvent)=>{
        //     console.log('debug onmousedown() '+ev.clientX+'x'+ev.clientY);
        // });

        // this._canvas.onmouseup = ((ev: MouseEvent)=>{
        //     console.log('debug onmouseup() '+ev.clientX+'x'+ev.clientY);
        //     this.ct._restoreImage();
        //     this.ct._drawCross(ev.clientX,ev.clientY,'green')
        // });

    }
}
