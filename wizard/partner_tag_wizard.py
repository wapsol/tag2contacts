from odoo import models, fields


class PartnerTagWizard(models.TransientModel):
    _name = "partner.tag.wizard"
    _description = "Change partner tag wizard"

    tag_wizard_ids = fields.Many2many('partner.tag.wizard', 'partner_tag_wizard_rel', 'tag_wizard_rel_1', 'tag_wizard_rel_2', string='Children Tags')
    partner_id = fields.Many2one('res.partner', string='Partner')
    tag_ids = fields.Many2many('res.partner.category', string='Tags')

    def action_tag_wizard(self, selected_ids):
        if not selected_ids:
            return False
        partner_ids = self.env['res.partner'].browse(selected_ids)
        vals_list = []
        for partner in partner_ids:
            vals_list.append({'partner_id': partner.id, 'tag_ids': partner.category_id.ids})
        child_tag = self.env['partner.tag.wizard'].create(vals_list)
        parent_tag = self.env['partner.tag.wizard'].create({'tag_wizard_ids': child_tag.ids})
        return parent_tag.id

    def action_confirm(self):
        active_id = self._context.get('res_id', False)
        if not active_id:
            return {'type': 'ir.actions.client', 'tag': 'reload'}
        parent_tag = self.env['partner.tag.wizard'].browse(active_id)
        for rec in parent_tag.tag_wizard_ids:
            rec.partner_id.sudo().write({'category_id': [(6, 0, rec.tag_ids.ids)]})
        return {'type': 'ir.actions.client', 'tag': 'reload'}

    def get_formview_id(self):
        return self.env.ref('tag2contacts.partner_tag_wizard_form').id
