window.onload = getData;
const routerLinks = document.querySelectorAll(".button");
const contentDivs = document.querySelectorAll(".content > div");

for (let i = 0; i < routerLinks.length; i += 1) {
    routerLinks[i].addEventListener('click', displayPage);
    contentDivs[i].style.display = "none";
    routerLinks[0].classList.add('active');
    contentDivs[0].style.display = "block";
}

function displayPage(event) {
    const targetLink = event.target;
    for (let i = 0; i < routerLinks.length; i += 1) {
        let linkContent = "";
        let dataContent = contentDivs[i].dataset.connect;

        routerLinks[i].classList.remove("active");
        contentDivs[i].style.display = "none";

        if (targetLink.classList.contains("button")) {
            targetLink.classList.add("active");
            linkContent = targetLink.textContent.trim().toLowerCase();

        } else if (targetLink.classList.contains('fas')) {
            targetLink.parentElement.classList.add("active");
            linkContent = targetLink.parentElement.textContent.trim().toLowerCase();
        }
        if (linkContent === dataContent) {
            contentDivs[i].style.display = "block";
        }
    }
}

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const response = JSON.parse(this.response);
        for (let i = 0; i < response.length; i += 1) {
            createElements(response, i);
        }
    }
    xhr.open("GET", "https://api.github.com/users/abdullahzayed812/repos", true);
    xhr.send();
}

function createElements(response, i) {
    let portfolioDiv = document.querySelector('.content .portfolio');
    let divEle = document.createElement('div');
    let buttonsContainer = document.createElement('div');
    let divContent = document.createTextNode(response[i].name);
    let viewButton = document.createElement('a');
    let buttonText = document.createTextNode('View');
    let sourceCodeButton = document.createElement('a');
    let sourceContent = document.createTextNode('Source Code');
    sourceCodeButton.appendChild(sourceContent);
    sourceCodeButton.setAttribute('href', response[i].html_url);
    sourceCodeButton.setAttribute('target', "_blank");
    viewButton.appendChild(buttonText);
    viewButton.setAttribute('href', "https://abdullahzayed812.github.io/" + response[i].name + "/");
    viewButton.setAttribute('target', "_blank");
    buttonsContainer.appendChild(viewButton);
    buttonsContainer.appendChild(sourceCodeButton);
    divEle.className = "port-content";
    divEle.appendChild(divContent);
    divEle.appendChild(buttonsContainer);
    portfolioDiv.appendChild(divEle);
}

document.getElementById('portfolio-link').onclick = function () {
    for (let i = 0; i < routerLinks.length; i += 1) {
        routerLinks[i].classList.remove("active");
        contentDivs[i].style.display = "none";
    }
    routerLinks[2].classList.add("active");
    contentDivs[2].style.display = "block";
}
