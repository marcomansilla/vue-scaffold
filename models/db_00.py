#-*- coding: utf-8 -*-

db.define_table('doc',
                Field('title'),
                Field('body')
)

db.define_table('simpleupload',
                Field('name'),
                Field('file', 'upload')
)

db.define_table('multipleuploads',
                Field('groupname', label='Group Name'),
                Field('files', 'upload')
)
