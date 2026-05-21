// ==========================
// DATA
// ==========================
// ==========================
// LOGIN SYSTEM
// ==========================

const loginBtn =
    document.getElementById("loginBtn");

const usernameInput =
    document.getElementById("username");

const emailInput =
    document.getElementById("email");

const loginContainer =
    document.getElementById("loginContainer");

const app =
    document.getElementById("app");

const welcomeText =
    document.getElementById("welcomeText");

// LOGIN EVENT
loginBtn.addEventListener(
    "click",
    loginUser
);

// LOGIN FUNCTION
function loginUser(){

    const username =
        usernameInput.value;

    const email =
        emailInput.value;

    // VALIDATION
    if(
        username === "" ||
        email === ""
    ){
        alert(
            "Please fill all fields"
        );

        return;
    }

    // USER OBJECT
    const user = {
        username,
        email
    };

    // SESSION STORAGE
    sessionStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    // HIDE LOGIN
    loginContainer.classList.add(
        "hidden"
    );

    // SHOW APP
    app.classList.remove(
        "hidden"
    );

    // WELCOME MESSAGE
    welcomeText.innerHTML =
        `Welcome ${username} 🍹`;
}

// ==========================
// CHECK SESSION
// ==========================

window.addEventListener(
    "load",
    checkUserSession
);

function checkUserSession(){

    const storedUser =
        sessionStorage.getItem(
            "user"
        );

    if(storedUser){

        const user =
            JSON.parse(storedUser);

        loginContainer.classList.add(
            "hidden"
        );

        app.classList.remove(
            "hidden"
        );

        welcomeText.innerHTML =
            `Welcome ${user.username} 🍹`;
    }
}
// FLAVOR PRICES
const flavorPrices = {
    Mint: 8,
    Lemon: 7,
    Strawberry: 10,
    Watermelon: 9
};

// FRUIT PRICES
const fruitPrices = {
    Kiwi: 2,
    Mango: 4,
    Pineapple: 3,
    Apple: 1
};

// ARRAYS
const fruits = [
    "Kiwi",
    "Mango",
    "Pineapple",
    "Apple"
];

const flavors = [
    "Mint",
    "Lemon",
    "Strawberry",
    "Watermelon"
];

// ==========================
// DOM
// ==========================

const flavorSelect =
    document.getElementById("flavor");

const fruitSelect =
    document.getElementById("fruit");

const sugarSelect =
    document.getElementById("sugar");

const iceInput =
    document.getElementById("ice");

const resultDiv =
    document.getElementById("result");

const favoritesDiv =
    document.getElementById("favorites");

const createBtn =
    document.getElementById("createBtn");

const randomBtn =
    document.getElementById("randomBtn");

const apiBtn =
    document.getElementById("loadApi");

const apiResults =
    document.getElementById("apiResults");

// ==========================
// EVENTS
// ==========================

createBtn.addEventListener(
    "click",
    createMojito
);

randomBtn.addEventListener(
    "click",
    randomMojito
);

apiBtn.addEventListener(
    "click",
    loadCocktails
);

// ==========================
// FUNCTIONS
// ==========================

// CREATE MOJITO
function createMojito(){

    const flavor =
        flavorSelect.value;

    const fruit =
        fruitSelect.value;

    const sugar =
        sugarSelect.value;

    const ice =
        parseInt(iceInput.value);

    // VALIDATION
    if(
        flavor === "" ||
        fruit === "" ||
        sugar === ""
    ){
        alert(
            "Please complete all fields"
        );

        return;
    }

    // PRICE
    const total =
        calculatePrice(
            flavor,
            fruit,
            ice
        );

    // COMPATIBILITY
    const compatibility =
        checkCompatibility(
            flavor,
            fruit
        );

    // OBJECT
    const mojito = {
        flavor,
        fruit,
        sugar,
        ice,
        total,
        compatibility
    };

    // DISPLAY
    displayMojito(mojito);

    // SAVE
    saveToLocalStorage(mojito);

    // SESSION STORAGE
    sessionStorage.setItem(
        "lastPrice",
        total
    );
}

// ==========================
// CALCULATE PRICE
// ==========================

function calculatePrice(
    flavor,
    fruit,
    ice
){

    // BASE FLAVOR PRICE
    const flavorPrice =
        flavorPrices[flavor];

    // FRUIT PRICE
    const fruitPrice =
        fruitPrices[fruit];

    // ICE PRICE
    const icePrice =
        ice * 0.5;

    // TOTAL
    const total =
        flavorPrice +
        fruitPrice +
        icePrice;

    return total;
}

// ==========================
// COMPATIBILITY
// ==========================

function checkCompatibility(
    flavor,
    fruit
){

    if(
        flavor === "Mint" &&
        fruit === "Kiwi"
    ){
        return "Excellent ✅";
    }

    else if(
        flavor === "Lemon" &&
        fruit === "Mango"
    ){
        return "Good 👍";
    }

    else if(
        flavor === "Strawberry" &&
        fruit === "Pineapple"
    ){
        return "Very Good 🔥";
    }

    else{
        return "Average ⚠️";
    }
}

// ==========================
// DISPLAY
// ==========================

function displayMojito(mojito){

    resultDiv.innerHTML = "";

    const card =
        document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h3>🍹 Custom Mojito</h3>

        <p>
            <strong>Flavor:</strong>
            ${mojito.flavor}
        </p>

        <p>
            <strong>Fruit:</strong>
            ${mojito.fruit}
        </p>

        <p>
            <strong>Sugar:</strong>
            ${mojito.sugar}
        </p>

        <p>
            <strong>Ice Cubes:</strong>
            ${mojito.ice}
        </p>

        <p>
            <strong>Total Price:</strong>
            ${mojito.total} DT
        </p>

        <p>
            <strong>Compatibility:</strong>
            ${mojito.compatibility}
        </p>

    `;

    resultDiv.appendChild(card);
}

// ==========================
// RANDOM MOJITO
// ==========================

function randomMojito(){

    const randomFlavor =
        flavors[
            Math.floor(
                Math.random() *
                flavors.length
            )
        ];

    const randomFruit =
        fruits[
            Math.floor(
                Math.random() *
                fruits.length
            )
        ];

    flavorSelect.value =
        randomFlavor;

    fruitSelect.value =
        randomFruit;

    sugarSelect.value =
        "Medium";

    iceInput.value =
        Math.floor(
            Math.random() * 6
        );

    createMojito();
}

// ==========================
// SAVE LOCAL STORAGE
// ==========================

function saveToLocalStorage(mojito){

    let mojitos = [];

    // GET OLD DATA
    const stored =
        localStorage.getItem(
            "mojitos"
        );

    if(stored){

        mojitos =
            JSON.parse(stored);
    }

    // ADD NEW
    mojitos.push(mojito);

    // SAVE AGAIN
    localStorage.setItem(
        "mojitos",
        JSON.stringify(mojitos)
    );

    showFavorites();
}

// ==========================
// SHOW FAVORITES
// ==========================

function showFavorites(){

    favoritesDiv.innerHTML = "";

    const mojitos =
        JSON.parse(
            localStorage.getItem(
                "mojitos"
            )
        ) || [];

    mojitos.forEach(function(item){

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <h3>
                ${item.flavor} Mojito
            </h3>

            <p>
                Fruit:
                ${item.fruit}
            </p>

            <p>
                Ice:
                ${item.ice}
            </p>

            <p>
                Price:
                ${item.total} DT
            </p>

        `;

        favoritesDiv.appendChild(card);
    });
}

// ==========================
// FETCH API
// ==========================

async function loadCocktails(){

    apiResults.innerHTML =
        "<p>Loading...</p>";

    try{

        const response =
            await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito"
            );

        const data =
            await response.json();

        apiResults.innerHTML = "";

        const drinks =
            data.drinks;

        drinks.forEach(function(drink){

            const div =
                document.createElement("div");

            div.className =
                "api-card";

            div.innerHTML = `

                <h3>
                    ${drink.strDrink}
                </h3>

                <img
                    src="${drink.strDrinkThumb}"
                    width="150"
                >

                <p>
                    ${drink.strInstructions}
                </p>

            `;

            apiResults.appendChild(div);
        });

    }

    catch(error){

        apiResults.innerHTML =
            "<p>Error loading API</p>";

        console.log(error);
    }
}

// ==========================
// START
// ==========================

showFavorites();