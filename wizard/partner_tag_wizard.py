from odoo import models, fields


class PartnerTagWizard(models.TransientModel):
    _name = "partner.tag.wizard"
    _description = "Change partner tag wizard"

    def _default_partner_id(self):
        active_id = self._context.get('active_id')

    partner_id = fields.Many2one('res.partner', string='Partner')
    tag_ids = fields.Many2many('res.partner.category', string='Tags')

    def edit_partner_tag(self, partner_ids):
        print(partner_ids)
