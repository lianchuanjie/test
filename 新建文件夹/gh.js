define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-class",
    "dojo/parser",
  "gridx/modules/GroupHeader"
], function(declare, lang, array, domClass, parser, Header){
  return declare(Header, {

        _needDojoParseInBuild: false,
        _build: function(){
      var t = this,
        g = t.grid,
        f = g.focus,
                // 复制列定义
        columns = g._columns.slice(),
        currentLevel = 0,
        level = t._parse(),
                // 复制组定义
        q = t.groups.slice(),
        sb = ['<table role="presentation" border="0" cellpadding="0" cellspacing="0">'];
      t._configMoveColumn();

            this._needDojoParseInBuild = false;
      var filter_col_id_map = { };
            var t = this;

      function build(){
        sb.push('<tr>');
        var prevColCount = 0;
        for(var i = 0, len = q.length; i < len; ++i){
          var item = q.shift();
          if(typeof item == 'number'){
            for(var j = 0; j < item; ++j){
              var col = columns[prevColCount + j],
                cls = col.headerClass,
                style = col.headerStyle,
                width = col.width;
              col._domId = (g.id + '-' + col.id).replace(/\s+/, '');
                            var content = t._constructHeaderCellContent(col, filter_col_id_map);
              sb.push(
                                // role,aria-readonly,tabindex,id
                                '<td role="columnheader" aria-readonly="true" tabindex="-1" id="', col._domId,
                                // colid,vlign
                '" colid="', col.id, '" valign="top',
                                // rowspan
                level - currentLevel ? '" rowspan="' + (level - currentLevel + 1) : '',
                                // class
                '" class="gridxCell ',
                    currentLevel ? 'gridxSubHeader' : '',
                    f && f.currentArea() == 'header' && col.id == t._focusHeaderId ? t._focusClass : '',
                    (cls && lang.isFunction(cls) ? cls(col) : cls) || '',
                                // style: width,min-width,max-width,
                '" style="width:', width, ';min-width:', width, ';max-width:', width, ';',
                    g.getTextDirStyle(col.id, col.name),
                    (style && lang.isFunction(style) ? style(col) : style) || '',
                                // header cell content
                                '">' + content + '</td>');
            }
            columns.splice(prevColCount, item);
          }else{
            prevColCount += item.colCount;
            q = q.concat(item.children);
            sb.push('<td tabindex="-1" colspan="', item.colCount,
              '" class="gridxGroupHeader', currentLevel ? ' gridxSubHeader' : '',
              '" groupid="', item.id,
              '"><div class="gridxSortNode">', item.name || '', '</div></td>');
          }
        }
        sb.push('</tr>');
        currentLevel++;
      }

      while(q.length){
        build();
      }

      sb.push('</table>');
      t.innerNode.innerHTML = sb.join('');
            t._dojoParseInBuild(filter_col_id_map);
      domClass.toggle(t.domNode, 'gridxHeaderRowHidden', t.arg('hidden'));
      domClass.add(g.domNode, 'gridxGH');
    },

        // 构造表格头的单元内容
        _constructHeaderCellContent: function(col, filterColIdMap) {
            var content, g = this.grid;
            if (col.headerRenderer)
            {
                // 必须设置sortable为false，否则sort模块会更改header的内容，导致这里的设置无效。
                col.sortable = false;
        var object_util = angular.cue.get("objectUtil");
        col.headerRendererId = object_util.getUniqueId("_headerRendererId_");
                content = "<div data-dojo-type='" + col.headerRenderer + "' data-dojo-props='" +
                    "rowId: \"__header__\", id: \""+ col.headerRendererId + "\", gridId: \"" + this.grid.id + "\", handleWidgetChange: \"" + col.handleWidgetChange + "\", columnId: \"" + col.id + "\"' style='width: 100%;'></div>";
                this._needDojoParseInBuild = true;
            }
            else
            {
                content = "<div class='gridxSortNode'>" + (col.name || "") + "</div>";
                // 添加表头过滤器。如果sort模块启动，sort模块会修改header，这里就无需处理headerFilter。
                if (g.headerFilter && !g.sort)
                {
                    var wrapper = g.headerFilter.getHeaderRendererFilterWrapper(col);
                    if (wrapper)
                    {
                        content += wrapper;
                        this._needDojoParseInBuild = true;
                        filterColIdMap[col.id] = true;
                    }
                }
            }
            return content;
        },

        _dojoParseInBuild: function(filterColIdMap) {
            var g = this.grid;
            if (this._needDojoParseInBuild)
      {
        parser.parse(this.innerNode);
        for (var col_id in filterColIdMap)
        {
          var n = query('td[colid="' + col_id + '"]', this.innerNode)[0];
          if (n)
            g.headerFilter.handleKeyDownEnter(n, col_id);
        }
        g.headerFilter.dispatchSetConditions();
      }
        },

    _initFocus: function() {
      var t = this, g = t.grid;
      if(g.focus){
        g.focus.registerArea({
          name: 'header',
          priority: 0,
          focusNode: t.innerNode,
          scope: t,
          doFocus: t._doFocus,
          doBlur: t._blurNode,
          onBlur: t._blurNode,
          connects: g.touch ? [
            t.aspect(g, 'onHeaderCellTouchStart', function(evt){
              domClass.add(evt.headerCellNode, t._focusClass);
            }),
            t.aspect(g, 'onHeaderCellTouchEnd', function(evt){
              domClass.remove(evt.headerCellNode, t._focusClass);
            })
          ] : [
            t.aspect(g, 'onHeaderCellKeyDown', '_onKeyDown'),
            t.connect(g, 'onHeaderCellMouseDown', function(evt) {
              // 只有未点击headerFilter，才能_focusNode，否则headerFilter为comboBox时，点击下拉按钮，会触发_focusNode，下拉框会收回
              if (!g.headerFilter || angular.cue.get("domUtil").getAncestorByClass(evt.target, "gridxSortNode", evt.currentTarget))
                t._focusNode(t.getHeaderNode(evt.columnId));
            })
          ]
        });
      }
    }
  });
});
