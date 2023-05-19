odoo.define('tag2contacts.form_widgets', function (require) {
	"use strict";

	var core = require('web.core');
	var utils = require('web.utils');
	var _t = core._t;
	var QWeb = core.qweb;
	var fieldRegistry = require('web.field_registry');
	var ListRenderer = require('web.ListRenderer');
	var rpc = require('web.rpc');
	var FieldOne2Many = require('web.relational_fields').FieldOne2Many;

	ListRenderer.include({
		_updateSelection: function () {
	        this.selection = [];
	        var self = this;
	        var $inputs = this.$('tbody .o_list_record_selector input:visible:not(:disabled)');
	        var allChecked = $inputs.length > 0;
	        $inputs.each(function (index, input) {
	            if (input.checked) {
	                self.selection.push($(input).closest('tr').data('id'));
	            } else {
	                allChecked = false;
	            }
	        });
	        if(this.selection.length > 0){
	        	$('.button_edit_partner_tag').show()
	        }else{
	        	$('.button_edit_partner_tag').hide()
	        }
	        this.$('thead .o_list_record_selector input').prop('checked', allChecked);
	        this.trigger_up('selection_changed', { selection: this.selection });
	        this._updateFooter();
	    },
	})


	var One2ManySelectable = FieldOne2Many.extend({
		template: 'One2ManySelectable',
		events: {
			"click .button_edit_partner_tag": "action_selected_lines",
		},
		start: function()
	    {
	    	this._super.apply(this, arguments);
			var self=this;		
	   },
		//passing ids to function
		action_selected_lines: function() {
			var self = this;
			var selected_ids = self.get_selected_ids_one2many();
			if (selected_ids.length === 0)
			{
				this.do_warn(_t("You must choose at least one record."));
				return false;
			}
			rpc.query({
				model: 'partner.tag.wizard',
				method: 'action_tag_wizard',
				args: [, selected_ids],
			}).then(function (resId) {
				if (resId) {
					self.do_action({
						name: 'Edit Partner Tag',
						type: 'ir.actions.act_window',
						res_model: 'partner.tag.wizard',
						res_id: resId,
						views: [[false, 'form']],
						target: 'new',
						context: {'res_id': resId},
					}).then(function() {
						$(".o_field_x2many_list_row_add, .o_list_record_remove").hide();
					});
				}
			});
		},

		_getRenderer: function () {
            if (this.view.arch.tag === 'kanban') {
                return One2ManyKanbanRenderer;
            }
            if (this.view.arch.tag === 'tree') {
                return ListRenderer.extend({
                    init: function (parent, state, params) {
                        this._super.apply(this, arguments);
                        this.hasSelectors = true;
                    },
                });
            }
            return this._super.apply(this, arguments);
        },

		get_selected_ids_one2many: function () {
            var self=this;
            var ids =[];
            this.$el.find('td.o_list_record_selector input:checked')
                    .closest('tr').each(function () {
                        ids.push(parseInt(self._getResId($(this).data('id'))));
            });
            return ids;
        },

        _getResId: function (recordId) {
            var record;
            utils.traverse_records(this.recordData[this.name], function (r) {
                if (r.id === recordId) {
                    record = r;
                }
            });
            return record.res_id;
        },
	});

	fieldRegistry.add('one2many_selectable', One2ManySelectable);
});
