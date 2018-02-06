#-*- coding: utf-8 -*-

def index():
    return dict()

def upload():
    form=SQLFORM(db.simpleupload).process()
    return dict(form=form)

def uploads():
    return dict()

def files():
    simple=db(db.simpleupload.id>0).select()
    return dict(simple=simple)
