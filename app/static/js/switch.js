var Switch=function($container, oncb, offcb,status){
	this.$container=$container;
	this.oncb=oncb;
	this.offcb=offcb;
    this.ifChecked=((typeof status=="undefined")|| status=="true"||status.toLocaleLowerCase()=="on")?true:false;
	this.$me=this._prebuild();
	this.build();
};
Switch.num=1;

Switch.prototype={
	_prebuild:function(){
	    var radioName="switchOptions"+Switch.num,str="";
	    str+='<div class="switch">';
	    str+='<label class="switch-radio" for="'+radioName+'_2">ON</label>';
	    //str+='<input type="radio" name="'+radioName+'" id="'+radioName+'_1" value="option1" checked>';
	    str+='<label class="switch-radio" for="'+radioName+'_1">OFF</label>';
        //str+='<input type="radio" name="'+radioName+'" id="'+radioName+'_2" value="option2">';
        str+='</div>';
		var me=$(str).appendTo(this.$container);
		Switch.num++;
		return me;
	},
	buttonOn:function(){
		this.$me.removeClass('switch-off');		
	},
	buttonOff:function(){
		this.$me.addClass('switch-off');
	},
	isChecked:function(){
		if(this.$me.hasClass('switch-off')){
		    //this.$me.removeClass("switch-off");
			this.ifChecked= false;
		}else{
		    //this.$me.addClass("switch-off");
			this.ifChecked= true;
		}
	},
	setStatus:function(status){
	    var _this=this;
	    if(status){
	        _this.buttonOn();
	        _this.oncb();
	    }else{
	        _this.buttonOff();
	        _this.offcb();
	    }
	},
	build:function(){
		var _this=this;
		_this.setStatus(_this.ifChecked);
		_this.$me.on('click',function(e){	
		    e.preventDefault();
		    _this.$me.toggleClass('switch-off');
		    _this.isChecked();
			if(_this.ifChecked){
				//_this.buttonOn();
				_this.oncb();
			}else{
				//_this.buttonOff();
				_this.offcb();
			}
		})
	}
}

// var sw1=new Switch('.box1');
// var sw2=new Switch('.box2',function(){},function(){});