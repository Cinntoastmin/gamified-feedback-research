---
title: "Section 4: Injection Timings"

description: “Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler"
---

While dependency injection is most commonly found in the constructor of a class it can be included elsewhere to achieve different effects. Dependencies included in the constructor of a class must be provided for successful instantiation. These dependencies are mandatory for the function of a class and are immutable, such as the engine of the car in the previous few sections.

The other common implementation is creating a setter which allows a dependency to be introduced and changed after an object's instantiation. Achieving an optional and mutable effect for the dependency.


### Check In:

#### Consider the following scenario:

<br>

##### You are a software developer creating an API to access a database. You’d like all API transactions to be logged. However, you do not want to commit to one logging solution. To be sure that your API has a logger while also being able to swap the logging solution, where should you add dependency injection?

<br>

<div id="survey-root" data-page="4">
    <form id="survey-form">
        <input type="radio" name="answer" value="A" required/>
            <label>Constructor</label><br><br>
        <input type="radio" name="answer" value="B" required/>
            <label>Setter</label><br><br>
        <input type="radio" name="answer" value="C" required/>
            <label>Both</label><br><br>
        <input type="radio" name="answer" value="D" required/>
            <label>Neither</label><br><br><br>
        <div class="range-container">
            <span>0</span>
            <input type="range" name="confidence" min="1" max="10" required> 
            <span>10</span>
            <label>How confident are you in your answer?</label>
        </div>
        <button type="submit">Submit</button>
    </form>
    <div id="experimental-feedback" hidden></div>
</div>

<script type="module">
    import "{{ site.baseurl }}/assets/js/main.js";
</script>