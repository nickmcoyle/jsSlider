var slider = function(instance) {
	
		var instance = instance; //saves a reference to the instance of slider that the developer created on the webpage, in case multiple instances are created on one page it still works
		var intervalId; //saves a reference to the id of the setInterval so it can be cancelled later by calling clearInterval(intervalId);
		this.index= 0;	//which element is selected to be displayed first, default 0
		this.transition= true; //if a transition is enabled allows nice animation on change of slider element(as soon as I create that)
		this.auto= false; //carousel feature. if true, the slider will automatically switch elements every (interval) seconds
		this.interval= 3000; //number of seconds each element will show before the next one auto is enabled
		//array of elements shown in the slider(can be images, videos, anything you want)
		this.slides = [
					//commented to show format
					/* {
					  element: 'http://www.nickmcoyle.com/uploads/post/image/36/content_Arduino_Uno.png',
					  caption: 'Arduino Uno Microcontroller'
					},
					{
					  element: 'http://www.nickmcoyle.com/uploads/post/image/37/content_MC33290.png',
					  caption: 'MC33290 ISO9141 K-Line level shifter chip'
					} */
		];
		//changes the selected element displayed in the slider, element (i), that is selected through a click or swipe
		this.displayElement = function(i) {
			var sliderContainer = document.getElementById('sliderContainer').getElementsByTagName('img')[0];			
			var image = this.slides[i].element;			
			sliderContainer.src = image;
			var sliderCaptionContainer = document.getElementById('sliderCaption');
			sliderCaptionContainer.innerHTML = this.slides[i].caption;
			
		};
		this.showNext = function(fromUser) {		
			//if a user clicked the button, then cancel the carousel functionality
			if(fromUser) { this.auto = false; clearInterval(intervalId);}				
			if(this.index < this.slides.length-1) {
				this.index+=1;
			} else {
				this.index = 0;
			}						
			this.displayElement(this.index);
			this.updateSliderIndex();
		};
		this.showPrevious = function(fromUser=true) {
			//if a user clicked the button, then cancel the carousel functionality
			if(fromUser) { this.auto = false; clearInterval(intervalId);}
			if(this.index > 0) {
				this.index-=1; 
			} else {
				this.index = this.slides.length-1;
			}
			this.displayElement(this.index);
			this.updateSliderIndex();
		};
		this.goToSlide = function(i, fromUser = true) {
		//if a user clicked the button, then cancel the carousel functionality
			if(fromUser) { this.auto = false; clearInterval(intervalId);}
			this.displayElement(i);
			this.index=i;
			this.updateSliderIndex();
			
		};
		this.carousel = function() {
		//intervalId saves a reference to the id of the setInterval so it can be cancelled later by calling clearInterval(intervalId);
		intervalId = setInterval(
			(function(self) { 				
					return function() {
					 self.showNext(); 
					}
				})(this),
				this.interval
		);	
		
		};
		this.updateSliderIndex = function() {		
			document.getElementsByClassName('indexSVG active')[0].setAttribute("class", "indexSVG");					
			activeSliderIndex = document.getElementById("sliderIndex"+(this.index)).setAttribute("class", "indexSVG active");		
		};
		this.createDot = function() {
			//appends to the DOM a circle element
			//use SVG image format
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var svgNS = svg.namespaceURI;
			var circle = document.createElementNS(svgNS,"circle");		
			circle.setAttributeNS(null,'cx',4);
			circle.setAttributeNS(null,'cy',4);
			svg.setAttributeNS(null,'width',12);		
			svg.setAttributeNS(null,'height',8);
			svg.setAttributeNS(null,'class','indexSVG');
			svg.setAttributeNS(null,'id','sliderIndex' + i);
			circle.setAttributeNS(null,'r',3);	
			circle.setAttributeNS(null,'stroke','#bbb');
			circle.setAttributeNS(null,'stroke-width',1);
			circle.setAttributeNS(null,'onclick',instance+'.goToSlide('+i+');');
			svg.appendChild(circle);		
			var indexContainer = document.getElementById("indexContainer");			 
			indexContainer.appendChild(svg);			
		};
	
	 
		this.initializeSlider = function() {	
		
			 //append a ton of HTML to the dom for the slider to go into
			 var sliderContainer = document.getElementById('sliderContainer');
			 var sliderDiv = document.createElement("div");
			 sliderDiv.id = "slider";
			 var imgContainer = document.createElement("div");
			 imgContainer.id = "imgContainer";
			 var imgTag = document.createElement("img");
			 imgTag.className = "img img-responsive img-thumbnail slider"; 
			 var previousBtn = document.createElement("button");
			 previousBtn.id = "previousBtn"; previousBtn.className = "sliderBtn";
			 previousBtn.setAttributeNS(null,'onclick',instance+'.showPrevious(fromUser=true);');
			 var nextBtn = document.createElement("button");
			 nextBtn.id = "nextBtn"; nextBtn.className = "sliderBtn";
			 nextBtn.setAttributeNS(null,'onclick',instance+'.showNext(fromUser=true);');
			
			 var nextArrowSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");	 
			 var nextArrowSVGNS = nextArrowSVG.namespaceURI;	 
			 var nextArrow = document.createElementNS(nextArrowSVGNS, "polygon");
			 nextArrow.setAttributeNS(null, "points", "0 0, 20 30, 0 60");
			 nextArrow.setAttributeNS(null, "fill", "#bbb");
			 nextArrowSVG.appendChild(nextArrow);	 
			 nextBtn.appendChild(nextArrowSVG);
			 
			 var previousArrowSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");	 
			 var previousArrowSVGNS = previousArrowSVG.namespaceURI;	 
			 var previousArrow = document.createElementNS(previousArrowSVGNS, "polygon");
			 previousArrow.setAttributeNS(null, "points", "10 3, 10 70, 0 35");
			 previousArrow.setAttributeNS(null, "fill", "#bbb");
			 previousArrowSVG.appendChild(previousArrow);	 
			 previousBtn.appendChild(previousArrowSVG);
			 
			 var indexContainer = document.createElement("div");
			 indexContainer.id = "indexContainer";
			 var sliderCaption = document.createElement("div");
			 sliderCaption.id = "sliderCaption";
			 imgContainer.appendChild(imgTag);
			 sliderDiv.appendChild(imgContainer);
			 sliderDiv.appendChild(previousBtn);
			 sliderDiv.appendChild(nextBtn);
			 sliderDiv.appendChild(indexContainer);
			 sliderDiv.appendChild(sliderCaption);	 
			 sliderContainer.appendChild(sliderDiv);	 
			 

			//first show the dots that you can click on to skip to different elements at the bottom of the slider
			//then display the first element of the slider, and carousel if this.auto = true
			//append to the DOM 1 circle for each element in the slides array 		
			for(i in this.slides) {			
				this.createDot();
			};		
			
			//add style to the dot corresponding the element that is currently displayed in the slider
			var activeSliderIndex = document.getElementById("sliderIndex"+this.index);		
			activeSliderIndex.setAttribute("class", "indexSVG active");
			
			//show first image in the array
			this.displayElement(0);
			
			//if auto option is enabled, then the slider will display the next element in the array every so many seconds	
			if(this.auto) {
				this.carousel();
			};		
			
		};
};