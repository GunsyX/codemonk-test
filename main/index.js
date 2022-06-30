const buttons = {
    generateTag: document.getElementById('b-generate'),
    addAttribute: document.getElementById('b-attr'),
    renderTags: document.getElementById('b-run'),
};

const inputs = {
    tag: {
        // current tag value input
        valueInput: document.getElementById('t-val'),
        // current tag type input (e.g. div, input, etc.)
        type: document.getElementById('t-type'),
        // current tag's attribute name input
        attrName: document.getElementById('t-attr-name'),
        // current tag's attribute value input
        attrValue: document.getElementById('t-attr-value'),
    }
}

const divs = {
    // GUI preview of the attributes for the new tag
    attrPreview: document.getElementById('attr-preview'),
    // container for user generated tags
    source: document.getElementById('source'),
    // container for rendered tags
    target: document.getElementById('target'),
}

const cleanup = (options) => {
    const { tag } = inputs;
    if(options.attr) {
        // erase attribute inputs
        tag.attrName.value = '';
        tag.attrValue.value = '';
    }else if(options.attrData) {
        // destroy attribute preview and attributes array
        attributes = [];
        divs.attrPreview.innerHTML = '';
    }else if(options.tag) {
        // erase tag inputs
        tag.valueInput.value = '';
        tag.type.value = '';
    }
}

let attributes = [];
const onAttributeAdd = (e) => {
    const { attrName, attrValue } = inputs.tag;
    // save attribute to internal array
    const newAttribute = {
        name: attrName.value,
        value: attrValue.value,
    }
    attributes.push(newAttribute);
    // generate attribute preview
    divs.attrPreview.innerHTML += `attributeName: ${newAttribute.name} | attributeValue: ${newAttribute.value}<br>`;
    // erase attribute inputs
    cleanup({attr: true});
}

const generateATag = () => {
    // generate tag based on user submitted values
    const { valueInput, type } = inputs.tag;
    const newElement = document.createElement(type.value);
    newElement.value = valueInput.value;
    newElement.innerHTML = valueInput.value;
    attributes.map(attr=>(
        newElement.setAttribute(attr.name, attr.value)
    ));
    // append tag to source container
    divs.source.appendChild(newElement);
    // erase tag inputs
    cleanup({attrData: true, attr: true, tag: true});
}

const extractDOMNodes = () => {
    // DOM node data array
    const nodeList = [];
    const getAttributes = (node) => {
        // extract attributes from the node
        const attributesNodeList = node.attributes;
        const attributeNames = Array.from(attributesNodeList);
        const attributes = {};
        attributeNames.map(attribute => {
            attributes[attribute.localName] = node.getAttribute(attribute.localName)
        })
        return attributes;
    }
    // map through source container's child nodes.
    Array.from(divs.source.children).map(node=>{
        // extract node data
        const newNodeObject = {
            tag: node.tagName.toLowerCase(),
            val: node.value,
            att: getAttributes(node),
        }
        // push node data to DOM node list
        nodeList.push(newNodeObject);
    })
    return nodeList;
}

const renderDOMNodes = (nodeList) => {
    // render DOM nodes to target container
    new HtmlGenerator(nodeList, divs.target)
}

const extractAndRender = () => {
    // extract DOM nodes from source container
    const nodeList = extractDOMNodes();
    // render DOM nodes to target container (for demonstration)
    renderDOMNodes(nodeList);
}

const main = () => {
    //attach listeners
    buttons.generateTag.addEventListener('click', generateATag);
    buttons.addAttribute.addEventListener('click', onAttributeAdd);
    buttons.renderTags.addEventListener('click', extractAndRender);
}

main();