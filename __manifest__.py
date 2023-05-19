{
    'name': 'Contact Tags',
    'version': '1.0',
    'category': 'Contacts',
    'summary': 'Manage Contact Tags',
    'author': 'Simplify-ERP™',
    'website': 'https://simplify-erp.de',
    'depends': ['base', 'contacts'],
    'data': [
        'views/res_partner_views.xml',
        'wizard/partner_tag_wizard.xml',
        'security/ir.model.access.csv',
    ],
    'assets': {
        'web.assets_backend': [
            'tag2contacts/static/src/js/widgets.js',
        ],
        'web.assets_qweb': [
            'tag2contacts/static/src/xml/widget_view.xml',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
