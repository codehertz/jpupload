var json = null;
$.extend({

    jpIFrameFileUpload: function(s) {
        var id = new Date().getTime();
        var frameId = 'jpIFrameFileUpload_Frame_' + id;
        var formId = 'jpIFrameFileUpload_From_' + id;

        //create iframe
        var frame = $.jpCreateUploadIFrame(frameId);

        //create from
        var form = $.jpCreateUploadForm(formId, frameId, s.fileElementId, s.url,
            (typeof(s.params)=='undefined'?false:s.params));

        //loaded
        frame.load(function(event){
            try {
                responseJson = frame.contents().find('body').html();
                eval('var json='+responseJson+';');
                s.callback(json);
            } catch (err) {
                s.fail(err);
            }

            frame.remove();
            form.remove();
        });

        //submit form
        form.submit();
    },

    jpCreateUploadIFrame: function(id) {
        //TODO noframe?
        var frame = $('<iframe id="'+id+'" name="'+id+'"></iframe>');
        frame.css('position', 'absolute');
        frame.css('top', '-2200px');
        frame.css('left', '-2200px');
        frame.appendTo('body');

        return frame;
    },

    jpCreateUploadForm: function(id, targetFrameId, srcFileElementId, url, params) {
        var form = $('<form></form>');
        form.attr('id', id);
        form.attr('name', id);
        form.attr('action', url); //TODO defined?
        form.attr('method', 'post');
        form.attr('target', targetFrameId);
        form.attr('enctype', 'multipart/form-data');

        form.css('position', 'absolute');
        form.css('top', '-1200px');
        form.css('left', '-1200px');

        if (params) for (var i in params) {
            $('<input name="' + i + '" value="' + params[i] + '" />').appendTo(form);
        }

        var srcFileElement = $('#' + srcFileElementId);
        srcFileElement.unbind();

        var newFileElement = srcFileElement.clone();
        srcFileElement.attr('id', id);
        srcFileElement.before(newFileElement);
        srcFileElement.appendTo(form);

        form.appendTo('body');

        return form;
    }

});
