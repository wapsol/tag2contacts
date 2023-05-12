from odoo import models, fields, api

class ResPartner(models.Model):
    _inherit = 'res.partner'

    @api.model
    def get_partners_by_tag(self, tag_id):
        return self.search([('category_id', 'in', tag_id)])
