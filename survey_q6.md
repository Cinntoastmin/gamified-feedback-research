---
title: "Section 6: The Drawbacks of Injection"

description: “‘Dependency Injection’ is a 25‑dollar term for a 5‑cent concept.” — James Shore
---

Dependency injection is not without its cost. The two most frequently indicated problems associated with dependency injection is its tendency to cause bloat in constructor signatures and the deferral of dependency errors until runtime.

Consider that you are creating an application that requires the following services: encryption, database, payment processing, and logging. The constructor signature for this class is already quite long


```
Public Application(
    EncryptInterface encryptor,
    DBInterface db,
    PPInterface payprocess,
    LogInterface logger,
    ...,){
}
```

Each dependency that your class has adds an argument to the class's constructor. As the requirements of your project grow, this constructor's signature bloats.

Runtime dependency errors come about as a direct result of the paradigm shift. The real problem here is that there will be no way to tell that a piece of code’s dependencies are correct until it is invoked. In a large server-hosted project, should one of these paths go undiagnosed in testing, it has the potential to take the entire server offlin

### Check In:

#### You are the senior developer on a SaaS project quickly increasing in scope. A team member suggests it's time to pay the tech debt and refactor the project to be more friendly for future development. What drawbacks would you want to consider if implementing dependency injection in your project?
<br>
<div id="survey-root" data-page="6">
    <form id="survey-form">
        <input type="radio" name="answer" value="A" required/>
            <label>Introducing dependency injection will increase coupling across your project making it harder to maintain in the future.</label><br><br>
        <input type="radio" name="answer" value="B" required/>
            <label>With dependency injection constructor signatures bloat commensurate with amount of a classes required dependencies.</label><br><br>
        <input type="radio" name="answer" value="C" required/>
            <label>Choosing dependency injection would break any currently mutable dependencies currently in your codebase.</label><br><br>
        <input type="radio" name="answer" value="D" required/>
            <label>Dependency injection will make testing more difficult, as the exact dependencies supplied at runtime will need to be supplied during testing.</label><br><br><br>
        <div class="range-container">
            <span>0</span>
            <input type="range" name="confidence" min="1" max="10" required> 
            <span>10</span>
            <label>How confident are you in your answer?</label>
        </div>
        <button type="submit">Submit</button>
    </form>
</div>

<script type="module">
    import "{{ site.baseurl }}/assets/js/main.js";
</script>