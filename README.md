Usage Instructions
==================

The widget itself is very simple to set-up
In order to create the linking button (or HTML element of your choice), you create the following tag:

#### 7digital Track Id 12345:
```html
<button class="7d-buynow" data-trackid="12345">Buy Track</button>
```

#### 7digital Release Id 12345:
```html
<button class="7d-buynow" data-releaseid="12345">Buy Release</button>
```

#### PartnerId
You also have the option of adding a partnerid using the following attribute:

```html
<... data-partner="123" ...>
```

#### Required libraries

You *must* then include the following script tags at the end of your html page:

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="http://underscorejs.org/underscore-min.js"></script>
<script type="text/javascript" src="http://instant.7digital.com/scripts/7d-buyitnow.js"></script>
```

Then - any element you click on with the correctly specified class (`7d-buynow`) will become a 7digital BuyItNow button.

#### Embedded iframe

You can also embed an iframe version if you want an even simpler way of creating a button. For example:

```html
<iframe src="http://instant.7digital.com/iframe.htm?releaseid=2199779&trackid=23684197&partnerid=123&buttontext=iFrame%20Example" seamless="seamless" width="120" height="30" scrolling="no"></iframe>
```
