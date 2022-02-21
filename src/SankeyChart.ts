import {
  Chart,
  LinearScale,
  ScriptableContext,
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

import { ISankeyData, ISankeyNode } from './ISankeyData';
import { Dictionary, merge } from "lodash";


export function SankeyChart(idata :ISankeyData) :HTMLCanvasElement{
  var canvas = document.createElement('canvas') as HTMLCanvasElement;
  merge(canvas.style, idata?.style?.chart || {} as CSSStyleDeclaration)
  canvas.title = idata?.title || '';

  var nodes: Dictionary<ISankeyNode> = idata?.nodes;

  function getColorByData(key: string): string{
    var ret = (nodes)?.[key]?.color;
    return ret ? ret : idata?.style?.flowColorDefault || 'gray'
  }
  function getLabels(idata :ISankeyData){
    var ret: Dictionary<string>= {}
    for(var i in nodes){
      ret[i] = nodes[i]?.title || i;
    } 
    return ret
  }
  function getPriority(idata :ISankeyData){
    var ret: Dictionary<number>= {}
    var priority=0
    for(var i in nodes){
      ret[i] = nodes[i]?.priority || Math.abs(++priority);
    } 
    return ret
  }
  
  if(canvas) new Chart(canvas, {
    type: 'sankey',
    data: {
      datasets: [
        {
          color: canvas.style?.color || 'initial',
          borderWidth: parseInt(idata?.style?.node?.borderWidth) || 0,
          borderColor: idata?.style?.node?.borderColor || 'transparent',
          data: idata?.links?.map(i=>({from:i?.from, to:i?.to, flow:i?.flow||1})) || [{from:"Error:",to:"No data!",flow: 1}],
          colorFrom: (config) => getColorByData(config.dataset.data[config.dataIndex].from),
          colorTo: (config) => getColorByData(config.dataset.data[config.dataIndex].to),
          colorMode: idata?.style?.colorMode || 'gradient',
          labels: getLabels(idata),
          priority: getPriority(idata),
          size: 'max', // 'max' or 'min' if flow overlap is preferred
        },
      ]
    },
  });
  return canvas;
}
