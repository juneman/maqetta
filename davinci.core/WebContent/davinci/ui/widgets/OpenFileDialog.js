dojo.provide("davinci.ui.widgets.OpenFileDialog");
	
dojo.require("davinci.ui.Panel");
dojo.require("davinci.model.Resource");

dojo.require("dojo.i18n");  
dojo.requireLocalization("davinci.ui", "uiLang");

//
//  usage:
//var dialog=new davinci.ui.widgets.OpenFileDialog(
//		   {fileTypes:"html",onSelect:function(selectedResource){}});
//


dojo.declare("davinci.ui.widgets.OpenFileDialog",null,{
	
	constructor : function (parms)
	{
	      this.filter=new davinci.model.Resource.FileTypeFilter(parms.fileTypes || "*");
	      dojo.mixin(this, parms);
	      davinci.ui.widgets.OpenFileDialog.filter=this.filter;
	},
	
	show : function(){
	
		var langObj = dojo.i18n.getLocalization("davinci.ui", "uiLang");
			var data={
					file  : null
					
			};
			davinci.ui.Panel.openDialog( {
					definition : [
					              {
					                  type: "tree",
//					                  label: "Select File",
					                  data: "file",
					                  model: "davinci.ui.widgets.ResourceTreeModel",
					                  filters: "davinci.ui.widgets.OpenFileDialog.filter"
					                }						],
					data:data,
					buttonLabel : 'Open',
					onOK:	dojo.hitch(this,function ()
					{
						debugger;
						this.onSelect(data.file);
					}),
					title:langObj.openFile
			});
		}
});