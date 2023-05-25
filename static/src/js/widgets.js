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
}

SelectableX2ManyField.components = {
...X2ManyField.components, ListRenderer: X2ManySelectableListRenderer
};

SelectableX2ManyField.template = "tag2contacts.One2ManySelectable";

registry.category("fields").add("one2many_selectable", SelectableX2ManyField);


