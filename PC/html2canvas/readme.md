> 官方网站：http://html2canvas.hertzen.com/

> github:https://github.com/niklasvh/html2canvas/

> API列表

> Name	Default	Description

> async	true	Whether to parse and render the element asynchronously

> allowTaint	false	Whether to allow cross-origin images to taint the canvas

> backgroundColor	#ffffff	Canvas background color, if none is specified in DOM. Set  null for transparent

> canvas	null	Existing  canvas element to use as a base for drawing on

> foreignObjectRendering	false	Whether to use ForeignObject rendering if the browser supports it

> imageTimeout	15000	Timeout for loading an image (in milliseconds). Set to  0 to disable timeout.

> ignoreElements	(element) => false	Predicate function which removes the matching elements from the render.

> logging	true	Enable logging for debug purposes

> onclone	null	Callback function which is called when the Document has been cloned for rendering, can be used to modify the contents that will be rendered without affecting the original source document.

> proxy	null	Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.

> removeContainer	true	Whether to cleanup the cloned DOM elements html2canvas creates temporarily

> scale	window.devicePixelRatio	The scale to use for rendering. Defaults to the browsers device pixel ratio.

> useCORS	false	Whether to attempt to load images from a server using CORS

> width	Element width	The width of the  canvas

> height	Element height	The height of the  canvas

> x	Element x-offset	Crop canvas x-coordinate

> y	Element y-offset	Crop canvas y-coordinate

> scrollX	Element scrollX	The x-scroll position to used when rendering element, (for example if the Element uses  position: fixed )

> scrollY	Element scrollY	The y-scroll position to used when rendering element, (for example if the Element uses  position: fixed )

> windowWidth	Window.innerWidth	Window width to use when rendering  Element , which may affect things like Media queries

> windowHeight	Window.innerHeight	Window height to use when rendering  Element , which may affect things like Media queries

> 当前支持CSS属性

> background

> background-clip (Does not support text)

> background-color

> background-image

> url()

> linear-gradient()

> radial-gradient()

> background-origin

> background-position

> background-size

> border

> border-color

> border-radius

> border-style (Only supports solid)

> border-width

> bottom

> box-sizing

> content

> color

> display

> flex

> float

> font

> font-family

> font-size

> font-style

> font-variant

> font-weight

> height

> left

> letter-spacing

> line-break

> list-style

> list-style-image

> list-style-position

> list-style-type

> margin

> max-height

> max-width

> min-height

> min-width

> opacity

> overflow

> overflow-wrap

> padding

> position

> right

> text-align

> text-decoration

> text-decoration-color

> text-decoration-line

> text-decoration-style (Only supports solid)

> text-shadow

> text-transform

> top

> transform (Limited support)

> visibility

> white-space

> width

> word-break

> word-spacing

> word-wrap

> z-index

> 当前不支持的CSS属性

> background-blend-mode

> border-image

> box-decoration-break

> box-shadow

> filter

> font-variant-ligatures

> mix-blend-mode

> object-fit

> repeating-linear-gradient()

> writing-mode

> zoom