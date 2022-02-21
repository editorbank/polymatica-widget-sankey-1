export class CanvasTools {

    public _canvas: any;
    private _image: any= undefined;

    constructor(canvas){
        this._canvas = canvas;
    }

    public _saveImage(): void{
        this._image = this._canvas.getContext('2d').getImageData(0,0,this._canvas.width,this._canvas.height);
    }
    public _restoreImage(): void{
        this._canvas.getContext('2d').putImageData(this._image,0,0);
    }

    public _drawRect(X :number, Y :number, W: number, H: number, color :string = 'black'){
        var ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(X,Y,W,H)
        ctx.restore();
    }
    
    public _drawCross(X,Y,color='red'){
        var ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0,Y,this._canvas.width,1);
        ctx.fillRect(X,0,1,this._canvas.height);
        ctx.restore();
    }

    public _drawText(text :string, X :number, Y :number, fontSize :number = this._fontHeigth, fontName :string = '\"Lucida console\"', fontColor :string = 'gray', rectColor='white'){
        var ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.save();
        // Предварительное просчитывание размера шрифта
        ctx.font = `${fontSize}px ${fontName}`;
        var m = ctx.measureText('Ёрш');
        var th = m.actualBoundingBoxAscent+m.actualBoundingBoxDescent;
        fontSize = fontSize*(fontSize/th)
        // Утановка уточнённого размера высоты шрифта
        ctx.font = `${fontSize}px ${fontName}`;
        m = ctx.measureText(text);
        if(rectColor != 'transparent'){
            ctx.fillStyle = rectColor;
            ctx.fillRect(X,Y,m.actualBoundingBoxRight+m.actualBoundingBoxLeft,m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)
        }    
        ctx.fillStyle = fontColor;
        ctx.fillText(text, X+m.actualBoundingBoxLeft, Y+m.actualBoundingBoxAscent);

        ctx.restore();
    }
    public _fontHeigth = 10;
    public _paddigLeft = 0;
    public _paddigTop = 0;
    public _CurrentLine = 0;
    public _LineInterval = this._fontHeigth;
    public _print(text:string=''){
        this._drawText(text, this._paddigLeft, ((this._CurrentLine++)*this._LineInterval) + this._paddigTop);
        return this;
    }

    public _debugObject(obj){
        this._CurrentLine=0;
        
        // this._print('Canvas size: '+obj._canvas.width+'x'+obj._canvas.height);
        
        this._print('---obj.theme--'); var op = JSON.stringify(obj.theme).split(/\]/); for(var i in op) this._print(op[i]);
        
        this._print('---obj._colors--'); var op = JSON.stringify(obj._colors).split(/\,/); for(var i in op) this._print(op[i]);
        this._print('---obj.idata--'); var op = JSON.stringify(obj.idata).split(/\}/); for(var i in op) this._print(op[i]);

        

        this._print('obj.lang: '+obj.lang);
        this._print('obj.viewSettings.colorMode: '+obj.viewSettings.colorMode);
        this._print('obj.viewSettings._NodesBorderColor: '+obj.viewSettings._NodesBorderColor);
        this._print('obj.viewSettings._NodesBorderValue: '+obj.viewSettings._NodesBorderValue);
        
        // this._print('---obj.options.data--'); var op = JSON.stringify(obj.options.data).split(','); for(var i in op) this._print(op[i]);
        // this._print('---obj.options.options--'); var op = JSON.stringify(obj.options.options).split(','); for(var i in op) this._print(op[i]);
        // this._print('---this--'); var op = JSON.stringify(this).split(/(?:})/); for(var i in op) this._print(op[i]);

        this._print('---obj.viewSettings--'); var op = JSON.stringify(obj.viewSettings).split(/(?=,)/); for(var i in op) this._print(op[i]);
        this._print('---obj.data--'); var op = JSON.stringify(obj.data).split(/(?:})/); for(var i in op) this._print(op[i]);
        // this._print('---obj.datasets--'); var op = JSON.stringify(obj.datasets).split(/(?:})/); for(var i in op) this._print(op[i]);
        this._print('---obj.dataSettings--'); var op = JSON.stringify(obj.dataSettings).split(/(?:})/); for(var i in op) this._print(op[i]);
        this._print('Done.');
        
    }

} 