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
    
    # respond to API call                                                  
    return api.process() 
