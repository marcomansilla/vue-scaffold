#-*- coding: utf-8 -*-

def api():
    from apimaker import APIMaker
    api = APIMaker(db)

    # permission set for  table doc
    api.add_policy('doc','GET')
    api.add_policy('doc','POST') 
    api.add_policy('doc','PUT') 
    api.add_policy('doc','DELETE')

    # permission set for  table simpleupload
    api.add_policy('simpleupload','GET')
    api.add_policy('simpleupload','POST') 
    api.add_policy('simpleupload','PUT') 
    api.add_policy('simpleupload','DELETE')

    # permission set for  table multipleuploads
    api.add_policy('multipleuploads','GET')
    api.add_policy('multipleuploads','POST') 
    api.add_policy('multipleuploads','PUT') 
    api.add_policy('multipleuploads','DELETE')
    response.js="console.log('done!')"
    # respond to API call                                                  
    return api.process() 


@request.restful()
def api2():
    response.view = 'generic.'+request.extension
    def GET(*args,**vars):
        patterns = 'auto'
        parser = db.parse_as_rest(patterns,args,vars)
        if parser.status == 200:
            return dict(content=parser.response)
        else:
            raise HTTP(parser.status,parser.error)
    def POST(table_name,**vars):
        return db[table_name].validate_and_insert(**vars)
    def PUT(table_name,record_id,**vars):
        return db(db[table_name]._id==record_id).update(**vars)
    def DELETE(table_name,record_id):
        return db(db[table_name]._id==record_id).delete()
    return dict(GET=GET, POST=POST, PUT=PUT, DELETE=DELETE)
