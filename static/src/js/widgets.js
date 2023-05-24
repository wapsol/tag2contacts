/** @odoo-module **/

import { registry } from "@web/core/registry";
import rpc from 'web.rpc';
import { ListRenderer } from "@web/views/list/list_renderer";
import { X2ManyField } from "@web/views/fields/x2many/x2many_field";
import { useService } from "@web/core/utils/hooks";

export class X2ManySelectableListRenderer extends ListRenderer {
	get hasSelectors() {
        this.props.allowSelectors = true
        let list = this.props.list
        list.selection = list.records.filter((rec) => rec.selected)
        list.selectDomain = (value) => {
            list.isDomainSelected = value;
            list.model.notify();
        }
        return this.props.allowSelectors && !this.env.isSmall;
    }
}

export class SelectableX2ManyField extends X2ManyField {
	get hasSelected(){
        return this.list.records.filter((rec) => rec.selected).length
    }
    async editPartnerTag() {
        let selected = this.list.records.filter((rec) => rec.selected)
        this.list.records
        var selected_list =[]
        selected.forEach((rec) => {
            if (rec.data.id){
                selected_list.push(parseInt(rec.data.id))}
        })
        var self = this
        if (selected_list.length !== 0){
            await rpc.query({
                model: 'partner.tag.wizard',
                method: 'action_tag_wizard',
                args: [, selected_list],
            }).then(function (resId) {
                if (resId) {
                    self.env.services.action.doAction({
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
        }
    }
	// events: {
	// 		"click .button_edit_partner_tag": "action_selected_lines",
	// 	},
	// start: function()
	// {
	// 	this._super.apply(this, arguments);
	// 	var self=this;
   // },
	// //passing ids to function
	// action_selected_lines: function() {
	// 	var self = this;
	// 	var selected_ids = self.get_selected_ids_one2many();
	// 	if (selected_ids.length === 0)
	// 	{
	// 		this.do_warn(_t("You must choose at least one record."));
	// 		return false;
	// 	}
	// 	rpc.query({
	// 		model: 'partner.tag.wizard',
	// 		method: 'action_tag_wizard',
	// 		args: [, selected_ids],
	// 	}).then(function (resId) {
	// 		if (resId) {
	// 			self.do_action({
	// 				name: 'Edit Partner Tag',
	// 				type: 'ir.actions.act_window',
	// 				res_model: 'partner.tag.wizard',
	// 				res_id: resId,
	// 				views: [[false, 'form']],
	// 				target: 'new',
	// 				context: {'res_id': resId},
	// 			}).then(function() {
	// 				$(".o_field_x2many_list_row_add, .o_list_record_remove").hide();
	// 			});
	// 		}
	// 	});
	// },

	// _getRenderer: function () {
	// 	if (this.view.arch.tag === 'kanban') {
	// 		return One2ManyKanbanRenderer;
	// 	}
	// 	if (this.view.arch.tag === 'tree') {
	// 		return ListRenderer.extend({
	// 			init: function (parent, state, params) {
	// 				this._super.apply(this, arguments);
	// 				this.hasSelectors = true;
	// 			},
	// 		});
	// 	}
	// 	return this._super.apply(this, arguments);
	// },
   //
	// get_selected_ids_one2many: function () {
	// 	var self=this;
	// 	var ids =[];
	// 	this.$el.find('td.o_list_record_selector input:checked')
	// 			.closest('tr').each(function () {
	// 				ids.push(parseInt(self._getResId($(this).data('id'))));
	// 	}tag2contacts.One2ManySelectable
	// 	return ids;
	// },
   //
	// _getResId: function (recordId) {
   //          var record;
   //          utils.traverse_records(this.recordData[this.name], function (r) {
   //              if (r.id === recordId) {
   //                  record = r;
   //              }
   //          });
   //          return record.res_id;
   //      },
}

SelectableX2ManyField.components = {
...X2ManyField.components, ListRenderer: X2ManySelectableListRenderer
};

SelectableX2ManyField.template = "tag2contacts.One2ManySelectable";

registry.category("fields").add("one2many_selectable", SelectableX2ManyField);


