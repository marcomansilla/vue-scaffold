#-*- coding: utf-8 -*-

def api():
    from apimaker import APIMaker
    api = APIMaker(db)

    # allow GET for table doc
    api.add_policy('doc','GET')

    # allow POST for table doc
    api.add_policy('doc','POST') 

    # allow PUT for table doc
    api.add_policy('doc','PUT') 

    # allow DELETE for table doc
    api.add_policy('doc','DELETE')

    
    # respond to API call                                                  
    return api.process() 
