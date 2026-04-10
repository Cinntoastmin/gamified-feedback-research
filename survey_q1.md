---
title: "Section 1: Coupling"

description: "Programming is not like being in the CIA; you don't get credit for being sneaky. It's more like advertising; you get lots of credit for making your connections as blatant as possible. -Steve McConnell, \"Code Complete\""
---
<div id="survey-root" data-page="1">
In software engineering, coupling is a description of the extent to which disparate software modules depend on one another. Coupling is described as tight, high, or strong when modules are entirely dependent or mostly dependent on one another and loose, low, or weak when modules have few dependencies between them.

As a concrete example, consider the following pseudocode class stub, assume anything relavent has been properly imported:

```
Class Car(){

    // private member variable: parts
	private Dictionary parts{};

	Public Car(){
		// Default car constructor
		self.parts = {};
		Engine myEngine = new Engine(Engine.V8);
		self.parts[‘engine’] = myEngine;
		// ...
    }
}
```

This class is composed of many subparts, which are stored as references in the class’s member dictionary <span style="font-family: 'Courier New', monospace;">parts{}</span>. In the constructor for the <span style="font-family: 'Courier New', monospace;">Car</span> class, it creates an instance of the <span style="font-family: 'Courier New', monospace;">Engine</span> class and places it in its <span style="font-family: 'Courier New', monospace;">parts{}</span> dictionary, as every car needs an engine. In this implementation, the <span style="font-family: 'Courier New', monospace;">Engine</span> is entirely reliant on the <span style="font-family: 'Courier New', monospace;">Car</span> to exist and therefore tightly coupled. Now whenever the <span style="font-family: 'Courier New', monospace;">Engine</span> class is altered, its connection with the Car class needs to be tested and preserved.

### Check In:

#### Which of the following relationships is **not** tightly coupled?

<form id="survey-form">
    <input type="radio" name="answer" value="A" required/>
        <label>A <span style="font-family: 'Courier New', monospace;">Car</span> object creates its own <span style="font-family: 'Courier New', monospace;">Engine</span> on instantiation
        </label><br>
    <input type="radio" name="answer" value="B" required/>
        <label>A <span style="font-family: 'Courier New', monospace;">NotificationService</span> is passed a <span style="font-family: 'Courier New', monospace;">TargetChannel</span> in its constructor. </label><br>
    <input type="radio" name="answer" value="C" required/>
        <label> The file path “log.txt” is set as a <span style="font-family: 'Courier New', monospace;">Logger</span> object's output location.</label><br>
    <input type="radio" name="answer" value="D" required/>
        <label> An <span style="font-family: 'Courier New', monospace;">AuthenticationService</span> instantiates an AES encryptor to secure their user’s plain text username and password on their end before transmitting them to the auth server. </label><br><br>
    <div class="range-container">
        <label>How confident are you in your answer?</label><br>
        <span>0 </span>
        <input type="range" name="confidence" min="1" max="10" required> 
        <span> 10</span>
    </div>
    <button type="submit">Submit</button>
<form>

<script type="module">
    import "assets/js/main.js";
</script>