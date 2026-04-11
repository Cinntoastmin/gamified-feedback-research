---
title: "Section 3: Injecting Dependencies"

description: "The key to performance is elegance, not battalions of special cases. - Jon Bently & Douglas Mcllroy"
---

Dependency injection is a common strategy to reduce coupling between software modules. Under dependency injection, modules are passed their required dependencies at runtime. This approach leverages Martin’s Dependency Inversion Principle in that a module only depends on an abstraction which promises certain functionality. Then an implementation matching that promise is passed in at runtime.

Referring back to the <span style="font-family: 'Courier New', monospace;">Car</span> class, which requires an <span style="font-family: 'Courier New', monospace;">Engine</span> object on instantiation. Consider the following refactor of the Car class:

```
Import EngineInterface;

Class Car(){
	Private Dictionary parts{};

	Public Car(EngineInterface engine){
		// Default car constructor
		Self.parts = {};
		Self.parts[‘engine’] = engine;
		// ...
    }
}
```

In this new implementation the <span style="font-family: 'Courier New', monospace;">Car</span> has been decoupled from the <span style="font-family: 'Courier New', monospace;">Engine</span> in that the concrete <span style="font-family: 'Courier New', monospace;">Engine</span> implementation can be altered without risk of breaking its interaction with the <span style="font-family: 'Courier New', monospace;">Car</span> class. It need only adhere to the EngineInterface abstraction.

### Check In:

#### Which of the following PaymentService constructor stubs best implements the concept of Dependency Injection?

<div id="survey-root" data-page="3">
    <form id="survey-form">
        <input type="radio" name="answer" required/>
            <label style="font-family: 'Courier New', monospace;">PaymentService(){self.processor = new AMXProcessor()}</label><br><br>
        <input type="radio" name="answer" required/>
            <label style="font-family: 'Courier New', monospace;">PaymentService(Object processor){...}</label><br><br>
        <input type="radio" name="answer" required/>
            <label style="font-family: 'Courier New', monospace;">PaymentService(ProcessorInterface processor){...}</label><br><br>
        <input type="radio" name="answer" required/>
            <label style="font-family: 'Courier New', monospace;">PaymentService(AMXProcessorInterface processor){...}</label><br><br><br>
        <div class="range-container">
            <span>0</span>
            <input type="range" name="confidence" min="1" max="10" required> 
            <span>10</span>
            <label>How confident are you in your answer?</label>
        </div>
        <button type="submit">Submit</button>
    <form>
</div>

<script type="module">
    import "{{ site.baseurl }}/assets/js/main.js";
</script>