package event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author lovequilt
	 */
	public class MenuEvent extends Event
	{
		public static var CLICK:String = "click";
		public static var CHNAGESTATE:String = "changestate";
		public var _type:String;
		public var _menuId:int;
		public function MenuEvent(type:String,menuId:int ) 
		{
			super(type);
			_type = type;
			_menuId = menuId;
		}
		
	}

}