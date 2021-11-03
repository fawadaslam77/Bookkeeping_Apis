class ResponseHelper{
    static dataFoundResponse(res,docs){
        return res.status(200).json({
            message:"record found",
            statusCode:200,
            data:docs,
            error:null
        });

    }

    static dataNotFoundResponse(res){
        return res.status(200).json({
            message:"No record found for requested Id",
            statusCode:500,
            data:null,
            error:"no record found for requested Id"
        });
    }

    static dataUpdatedResponse(res,data){
        return res.status(200).json({
            message:"record updated successfully",
            statusCode:200,
            data:data,
            error:null
        });
    }

    static someThingWentWrongResponse(res,err){
        return res.status(200).json({
            message:"Some thing went wrong",
            statusCode:500,
            data:null,
            error:err
        });
    }

    static dataRemovedResponse(res){
        return res.status(200).json({
            message:"deleted successfully",
            statusCode:200,
            data:null,
            error:null
        });
    }

    static dataSavedResponse(res){
        return res.status(200).json({
            message:'data got saved successfully',
            statusCode:200,
            data:doc,
            error:null
        });
    }
}
module.exports = ResponseHelper;