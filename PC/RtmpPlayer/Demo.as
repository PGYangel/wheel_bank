package
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.events.AsyncErrorEvent;
	import flash.events.MouseEvent;
	import flash.events.NetStatusEvent;
	import flash.events.SecurityErrorEvent;
	import flash.geom.Rectangle;
	import flash.media.SoundTransform;
	import flash.media.Video;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.events.Event;
	import flash.system.Security;
	
	public class Demo extends Sprite
	{
		private var serverURL:String = "rtmp://pull.video.q1.com/live/";
		
		private var streamUrl:String = ""
		private var connection:NetConnection;
		private var stream:NetStream;
		private var client:CustomClient = new CustomClient();
		private var isPause:Boolean = false;
		
		private var pauseTime:Number = 0;
		
		private var _soundTransform:SoundTransform;
		private var _volumeRectangle:Rectangle;
		private var _volumeSeekHeight:Number;
		private var _isMute:Boolean = false;
		private var _curVolume:Number = 0.6;
		
		public function Demo()
		{
			stage.showDefaultContextMenu = false;
			stage.align = StageAlign.TOP_LEFT;
			streamUrl = root.loaderInfo.parameters.streamUrl;
			//streamUrl = "lw_q1_com"
			Security.allowDomain('*');
			Security.allowInsecureDomain("*")
			connection = new NetConnection();
			connection.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
			connection.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			connection.addEventListener(AsyncErrorEvent.ASYNC_ERROR, onAsyncHandler);
			connection.client = client;
			connection.connect(serverURL);
			
			buffering.visible = true;
			//ppBtn.addEventListener(MouseEvent.CLICK, clickHandler);
		}
		
		private function netStatusHandler(event:NetStatusEvent):void
		{
			trace(event.info.code);
			switch (event.info.code)
			{
				case "NetConnection.Connect.Success": 
					connectStream();
					break;
				case "NetStream.Play.StreamNotFound": 
					//info_txt.text="Stream not found: " + serverURL;
					break;
				case "NetStream.Buffer.Full": 
					//buffering.visible = false;
					break;
				case "NetStream.Buffer.Flush": 
					break;
				case "NetStream.Buffer.Empty": 
					buffering.visible = true;
					break;
				case "NetStream.Play.Start": 
					//buffering.visible = false;
					addEventListener(Event.ENTER_FRAME, checkClient);
					break;
				case "NetStream.Play.Stop": 
					break;
			
			}
		}
		
		private function onAsyncHandler(event:AsyncErrorEvent):void
		{
			trace("onAsyncHandler: " + event);
		}
		
		private function securityErrorHandler(event:SecurityErrorEvent):void
		{
			//info_txt.text="域安全—securityErrorHandler: " + event;
		}
		
		private function connectStream():void
		{
			stream = new NetStream(connection);
			stream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
			stream.client = client;
			
			var video:Video = new Video(stage.stageWidth, stage.stageHeight);
			video.attachNetStream(stream);
			//stream.bufferTime = 10;
			if (streamUrl == null)
			{
				//info_txt.text = "连接出错！"
			}
			else
			{
				stream.play(streamUrl);
					//info_txt.text = serverURL + streamUrl;
			}
			//stream.play("CCTV5");
			
			addChildAt(video, 1);
			setVolume(_curVolume);
			volumeMute.mute.buttonMode = true;
			
			volumeMute.mute.addEventListener(MouseEvent.CLICK, volumeEvent);
			volumeMute.addEventListener(MouseEvent.ROLL_OVER, showVolumeBar);
			volumeMute.addEventListener(MouseEvent.ROLL_OUT, hideVolumeBar);
		}
		
		private function checkClient(e:Event):void
		{
			//trace(stream.time, stream.bufferLength,stream.info.videoBufferByteLength);
			if (client.iH != 0 && client.iW != 0 && stream.bufferLength != 0)
			{
				buffering.visible = false;
				
					//removeEventListener(Event.ENTER_FRAME, checkClient);
			}
		}
		
		private function clickHandler(e:Event):void
		{
			if (isPause)
			{
				stream.resume();
					//stream.seek(pauseTime);
				
			}
			else
			{
				stream.pause();
				pauseTime = stream.time;
					//trace(stream.time);
			}
			isPause = !isPause;
		}
		
		private function volumeEvent(e:MouseEvent):void
		{
			if (_isMute)
			{
				setVolumeBar(_curVolume);
				setVolume(_curVolume);
			}
			else
			{
				setVolumeBar(0);
				setVolume(0);
				volumeMute.mute.gotoAndStop(2);
				_isMute = !_isMute;
			}
		
		}
		
		private function showVolumeBar(e:Event):void
		{
			volumeMute.gotoAndStop(2)
			addVolumeEvent();
			if (_isMute)
			{
				setVolumeBar(0);
			}
			else
			{
				setVolumeBar(_curVolume);
			}
		}
		
		private function hideVolumeBar(e:Event):void
		{
			removeVolumeEvent();
			volumeMute.gotoAndStop(1)
		}
		
		private function addVolumeEvent():void
		{
			
			volumeMute.volumeControl.seeker.buttonMode = true;
			volumeMute.volumeControl.seeker.addEventListener(MouseEvent.MOUSE_DOWN, onVolumeSeekerDown);
			volumeMute.volumeControl.seeker.addEventListener(MouseEvent.ROLL_OVER, onVolumeSeekerOver);
			if (_volumeRectangle == null)
			{
				_volumeSeekHeight = volumeMute.volumeControl.volumeBar.height - volumeMute.volumeControl.seeker.height;
				_volumeRectangle = new Rectangle(volumeMute.volumeControl.seeker.x, volumeMute.volumeControl.volumeBar.y, 0, _volumeSeekHeight);
			}
		}
		
		private function onVolumeSeekerOver(e:MouseEvent):void
		{
			//trace("xx")
		}
		
		private function onVolumeSeekerDown(e:MouseEvent):void
		{
			volumeMute.volumeControl.seeker.startDrag(false, _volumeRectangle);
			volumeMute.addEventListener(Event.ENTER_FRAME, onVolumeSlide);
			this.stage.addEventListener(MouseEvent.MOUSE_UP, removeVolumeEvent);
		}
		
		private function onVolumeSlide(e:Event):void
		{
			var per:Number = (100 - volumeMute.volumeControl.seeker.y) / _volumeSeekHeight;
			volumeMute.volumeControl.volumeSeekerBar.height = volumeMute.volumeControl.volumeBar.height - volumeMute.volumeControl.seeker.y + 3;
			
			_curVolume = Math.round(per * 100) / 100;
			setVolume(_curVolume);
		}
		
		private function setVolume(newVolume:Number):void
		{
			if (!stream)
				return;
			_soundTransform = stream.soundTransform;
			_soundTransform.volume = newVolume;
			stream.soundTransform = _soundTransform;
			if (newVolume > 0 || newVolume == _curVolume)
			{
				volumeMute.mute.gotoAndStop(1);
				_isMute = false;
			}
		/*volumeMute.mute.gotoAndStop((newVolume > 0) ? 1 : 2);
		 _isMute = (newVolume > 0) ? false : true;*/
		}
		
		private function setVolumeBar(voNum:Number):void
		{
			volumeMute.volumeControl.seeker.y = 100 - voNum * _volumeSeekHeight;
			volumeMute.volumeControl.volumeSeekerBar.height = volumeMute.volumeControl.volumeBar.height - volumeMute.volumeControl.seeker.y + 3;
		}
		
		private function removeVolumeEvent(e:MouseEvent = null):void
		{
			if (volumeMute.currentFrame == 2)
			{
				volumeMute.volumeControl.seeker.stopDrag();
				volumeMute.removeEventListener(Event.ENTER_FRAME, onVolumeSlide);
				this.stage.removeEventListener(MouseEvent.MOUSE_UP, removeVolumeEvent);
			}
		}
	}
}

class CustomClient
{
	public var iW:Number;
	public var iH:Number;
	
	public function onMetaData(info:Object):void
	{
		iW = info.width;
		iH = info.height;
		trace("metadata: duration=" + info.duration + " width=" + info.width + " height=" + info.height + " framerate=" + info.framerate);
	}
	
	public function onCuePoint(info:Object):void
	{
		trace("cuepoint: time=" + info.time + " name=" + info.name + " type=" + info.type);
	}
	
	public function onBWDone():void
	{
	
	}
	
	public function close():void
	{
	
	}
}
