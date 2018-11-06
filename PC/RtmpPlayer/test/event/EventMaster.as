package event{
	
	import flash.events.*;
	
	public class EventMaster{
		
		private var _dispatcher:EventDispatcher = new EventDispatcher();
		
		private static var _instance:EventMaster;
		
		public function EventMaster(temp:Temp):void{
			//
		}
		
		public static function getInstance():EventMaster{
			if(_instance == null){
				_instance = new EventMaster(new Temp());
			}
			return _instance;
		}
		
		//发送一个事件
		public function dispatchEvent(event:Event):void{
			_dispatcher.dispatchEvent(event);
		}
		
		//注册一个事件
		public function addEventListener(str:String,handler:Function):void{
			_dispatcher.addEventListener(str,handler);
		}
		
		//删除一个事件
		public function removeEventListener(str:String,handler:Function):void{
			_dispatcher.removeEventListener(str,handler);
		}
	}
}
class Temp{
	
}