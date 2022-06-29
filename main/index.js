const source = document.getElementById('source');

let attributes = [];
const onAttributeAdd = (e) => {
    const attrNameDiv = document.getElementById('t-attr-name');
    const attrValueDiv = document.getElementById('t-attr-value');
    const newAttribute = {
        name: attrNameDiv.value,
        value: attrValueDiv.value,
    }
    const previewDiv = document.getElementById('attr-preview');
    attributes.push(newAttribute);
    previewDiv.innerHTML += `\nattributeName: ${newAttribute.name} | attributeValue: ${newAttribute.value}\n`;
    // cleanup
    attrNameDiv.value = '';
    attrValueDiv.value = '';
}

const generateATag = () => {
    // get the tags
    const tVal = document.getElementById('t-val').value;
    const tType = document.getElementById('t-type');
    const newElement = document.createElement(tType.value);
    
    newElement.value = tVal;
    newElement.innerHTML = tVal;
    attributes.map(attr=>(
        newElement.setAttribute(attr.name, attr.value)
    ));
    source.appendChild(newElement);
    // cleanup
    attributes = [];
    document.getElementById('attr-preview').innerHTML = '';

}

const extractDOMNodes = () => {
    const nodeList = [];
    const getAttributes = (node) => {
        const attributesNodeList = node.attributes;
        const attributeNames = Array.from(attributesNodeList);
        console.log(attributeNames);
        const attributes = {};
        attributeNames.map(attribute => {
            attributes[attribute.localName] = node.getAttribute(attribute.localName)
        })
        console.log(attributes);
        return attributes;
    }
    Array.from(source.children).map(node=>{
        const newNodeObject = {
            tag: node.tagName.toLowerCase(),
            val: node.value,
            att: getAttributes(node),
        }
        nodeList.push(newNodeObject);
    })
    console.log(nodeList);
    return nodeList;
}

const renderDOMNodes = (nodeList) => {
    new HtmlGenerator(nodeList, document.body)
    console.log('rendered');
}

const extractAndRender = () => {
    const nodeList = extractDOMNodes();
    renderDOMNodes(nodeList); // for demonstration
}

const main = () => {
    // get the tags
    const generateTagButton = document.getElementById('b-generate');
    const addAttributeButton = document.getElementById('b-attr');
    const renderTagsButton = document.getElementById('b-run');

    //attach listeners
    generateTagButton.addEventListener('click', generateATag);
    addAttributeButton.addEventListener('click', onAttributeAdd);
    renderTagsButton.addEventListener('click', extractAndRender);
}

main();


//test attributes