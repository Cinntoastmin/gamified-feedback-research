const FEEDBACK_MATRIX = {
    "1":{
        "A":"This is a classic example of tight coupling. The Car class is directly responsible for creating a specific Engine implementation, which means: The Car cannot work with a different engine type without modification, Testing the Car in isolation becomes difficult, and Changes to the Engine construction logic force changes in Car.",
        "C":"Hard-coding a configuration value like a file path tightly couples the logger to: a specific output medium and a specific environment or deployment setup. This reduces flexibility and makes it harder to: redirect logs elsewhere, reuse the logger in different context, and adjust behavior without chaning code.",
        "D":"The AuthenticationService directly instantiating a specific encryption algorithm tightly couples it to: a single encryption strategy and a specific cryptographic implementation. As a result: changing the encryption method requires modifying the service, testing with alternate or mock encryption implementations are harder, the service takes on responsibility for encryption details."
    },
    "2":{
        "B":"Although this class supports multiple output formats (PDF, CSV, HTML), it still has one core responsibility: generating an end-of-day report. The different formats are simply different representations of the same report, not separate responsibilities. Under SRP, a class can have multiple methods as long as they all serve a single reason to change. In this case, the class would change only if the report generation requirements change, not because of unrelated business logic.",
        "C":"This design actually reflects good adherence to SOLID principles. The PaymentProcessor depends on a PaymentGateway interface, which allows different implementations to be swapped in at runtime. Using an interface does not add extra responsibility—it reduces coupling and keeps the class focused on a single task: processing payments. Supporting different gateways is an example of extensibility, not a violation of SRP.",
        "D":"The calcTotal() method operates entirely on the order's own data (line items, taxes, discounts). Calculating the total is a natural responsibility of an Order object because it represents order-related business logic. This class has one clear responsibility: representing and managing order data and behavior. Including a calculation that derives from that data does not introduce multiple responsibilities."
    },
    "3":{
        "A":"This constructor does not use dependency injection at all. The PaymentService creates its own dependency by instantiating AMXProcessor directly, which tightly couples the service to a specific concrete implementation.",
        "B":"While this technically allows a dependency to be injected, using Object is too generic and provides no semantic meaning or contract about what the processor is expected to do.",
        "D":"This constructor injects a dependency, but the abstraction is still too specific. By tying the service to an AMXProcessorInterface, the class is now indirectly coupled to the AMX payment family."
    },
    "4":{
        "C":"Using both constructor and setter injection introduces unnecessary complexity and weakens the design intent.",
        "B":"Setter-based dependency injection does allow you to swap out logging implementations, but it does not guarantee that a logger is present.",
        "D":"If dependency injection is not used at all, the API will likely: Instantiate a concrete logger internally, be tightly coupled to a specific logging flamework, require code changes to switch logging implementations."
    },
    "5":{
        "A":"Dependency injection does not guarantee that a connection to a live service (such as a database) is valid. In fact, one of the main benefits of dependency injection is that it allows tests to avoid connecting to live services entirely.",
        "C":"Dependency injection has nothing to do with caching or query optimization. While tests may run faster when mocks or stubs are used, this speedup comes from isolating the code under test, not from caching database results.",
        "D":"Dependency injection does not manage transactions, rollbacks, or database state. Reverting database changes requires explicit transaction handling or database-specific tooling. In well-designed unit tests, a live database should not be modified at all, which is exactly why DI enables the use of mock or fake services instead."
    },
    "6":{
        "A":"Dependency injection reduces coupling, rather than increasing it. DI shifts dependencies from concrete implementations to abstractions (such as interfaces), which makes components more loosely coupled and easier to modify or replace.",
        "C":"Dependency injection does not require dependencies to be immutable, nor does it inherently break mutable ones. Existing mutable dependencies can still be injected through constructors or setters without changing their mutability. Refactoring to DI may expose poor design choices, but that is a benefit—not a drawback—and does not mean DI itself breaks existing dependencies.",
        "D":"Dependency injection actually makes testing easier, not harder. By externalizing dependencies, tests can supply mock or fake implementations that are predictable and isolated from real systems."   
    }
};  

export function conditionalExpTrigger({
    isCorrect,
    pageNumber,
    givenAnswer,
    correctAnswer,
    callback
}) {
    const condition = localStorage.getItem("condition"); 

    let feedbackType;

    if ( condition === "control" && isCorrect) {
        feedbackType = "CONTROL_POSITIVE";
    } else if (condition === "control" && !isCorrect) {
        feedbackType = "CONTROL_NEGATIVE";
    } else if (condition === "experimental" && isCorrect) {
        feedbackType = "EXPERIMENTAL_POSITIVE";
    } else if (condition === "experimental" && !isCorrect) {
        feedbackType = "EXPERIMENTAL_NEGATIVE";
    }

    serveFeedBack({
        pageNumber,
        givenAnswer,
        correctAnswer,
        callback,
        feedbackType
    });
    
    return false;
}

function serveFeedBack({
    pageNumber,
    givenAnswer,
    correctAnswer,
    callback,
    feedbackType
}) {
    const expContainer = document.getElementById("experimental-feedback");

    if (feedbackType === "CONTROL_POSITIVE"){
        expContainer.innerHTML = 
        `
        <div id="pill-outer" style="background-color: #82fa94;border-color: #000000;margin-top: 5%;border-width: 10;">
            <div style="position: relative;display: flex; flex-direction: row;align-items: center; padding: 5%;">
                <div id="feedback-left" style="width: 15%; height: 15%; padding-right: 5%;">
                    <img src="/gamified-feedback-research/assets/png/check_mark_negative.png" alt="Correct Icon">
                </div>
                <span style="font-weight: bold; align-items: end; font-size: xx-large;text-align: right;">Correct</span>             
            </div>
        </div>
        <button id="tutorial-continue" style="width: 100%;height: 35px; margin-top: 5%;">Next Page</button>
        `;
    } else if (feedbackType === "CONTROL_NEGATIVE") {
        expContainer.innerHTML = 
        `
        <div style="background-color: #d90000;border-color: #333333;border-radius: 10%;border-width: 5px;>
            <div style="display: flex;flex-direction: row">
                <img src="/gamified-feedback-research/assets/png/cross_circles_negative.png">
                <h2>Incorrect</h2>
            </div>
        </div>
        <button id="tutorial-continue" style="width: 100%;height: 35px">Next Page</button>
        `;
    } else if (feedbackType === "EXPERIMENTAL_POSITIVE"){
        expContainer.innerHTML = 
        `
        <div class="tutorial-box" style="display: flex; flex-direction: column;">
            <div style="display: flex; flex-direction: row;">
                <div class="tutorial-avatar" style="width: 50%;">
                    <img src="/gamified-feedback-research/assets/png/exp-mascot.png">
                </div>
                <div class="tutorial-content" style="display: flex; flex-direction: column;width: 50%">
                    <p style="font-size: xx-large"><strong>That Is Correct.</strong></p>
                </div>
            </div>
            <button id="tutorial-continue" style="width: 100%;height: 50px;"> Next Question</button>
        </div>
        `;
    } else if (feedbackType === "EXPERIMENTAL_NEGATIVE"){
        const feedback = FEEDBACK_MATRIX?.[pageNumber]?.[givenAnswer];
        expContainer.innerHTML = 
        `
        <div class="tutorial-box" style="display: flex; flex-direction: column;">
            <div style="display: flex; flex-direction: row;">
                <div class="tutorial-avatar" style="width: 50%;">
                    <img src="/gamified-feedback-research/assets/png/exp-mascot.png">
                </div>
                <div class="tutorial-content" style="display: flex; flex-direction: column;width: 50%">
                    <p style="font-size: xx-large"><strong>Let's Review.</strong></p>
                    <p style="margin: 10px;">
                        you selected <code>${givenAnswer}</code>, but the correct answer was <code>${correctAnswer}</code>.
                    </p>
                    <p style="margin: 10px;">
                        ${feedback}
                    </p>
                </div>
            </div>
            <button id="tutorial-continue" style="width: 100%;height: 50px;"> Next Question</button>
        </div>
        `;
    }

    expContainer.hidden = false

    document.getElementById("tutorial-continue").addEventListener("click", () => {
        expContainer.hidden=true;
        callback();
    })
}