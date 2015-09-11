function Clipboard() {
    this.source_range = document.createRange();
    this.memory_fragment = null;
    this.clone_fragment = null;
}

Clipboard.prototype._prepare_cut_copy = function(dom_element_id){
    try{
        var dom_node = document.getElementById(dom_element_id);
        this.source_range.setStart(dom_node,0);
        this.source_range.setEndAfter(dom_node);
    }catch(err){
        return false;
    }
}

Clipboard.prototype.copy = function(dom_element_id) {
    try{
        this._prepare_cut_copy(dom_element_id);
        this.memory_fragment= this.source_range.cloneContents();
    }catch(err){
        return false;
    }
};

Clipboard.prototype.cut = function(dom_element_id) {
    try{
        this._prepare_cut_copy(dom_element_id);
        this.memory_fragment = this.source_range.extractContents();
    }catch(err){
        return false;
    }
};
    
Clipboard.prototype.paste = function(dom_element_id) {
    try{
        var clone_fragment=this.memory_fragment.cloneNode(true)
        var input_node = document.getElementById(dom_element_id);
        var input_node_name = input_node.nodeName.toLowerCase();
        if(input_node_name == "input" || input_node == "textarea"){
            input_node.value = clone_fragment.textContent;
        }else{
            input_node.innerHTML = clone_fragment.textContent;
        }
    }catch(err){
        return false;
    }
};

window.cb = new Clipboard();
