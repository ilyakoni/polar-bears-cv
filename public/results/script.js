function magnify(zoom, count) {
    var img, glass, w, h, bw;
    img = document.getElementsByTagName("img")
    img = img[count]
    
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "none");
    
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      box = img.getBoundingClientRect()
      console.log(`x:${pos.x}\n y:${pos.y} \n box xs:${box.left}, ${box.right}\n box ys:${box.top+ box.bottom}`)
      x = pos.x;
      y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      // hide magnifier if it goes outside the box
      console.log('\n\ncomparing x1 ', box.top,'  and x2' , pos.pageY)
      if (box.right>pos.pageX && box.left < pos.pageX && box.top <pos.pageY && box.bottom >pos.pageY ){glass.setAttribute('class','imageMagnifier')} else (glass.setAttribute('class','none'))
      /* Set the position of the magnifier glass: */
      glass.style.left = (x) + "px";
      glass.style.top = (y) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e, a) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      pageX = e.pageX;
      pageY = e.pageY;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y, pageX : pageX, pageY:pageY}; 
    }
  }