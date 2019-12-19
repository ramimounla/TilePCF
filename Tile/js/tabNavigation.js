function navigateToTab(tabName){
    alert(tabName);
    Xrm.Page.ui.tabs.get(tabName).setFocus()
}