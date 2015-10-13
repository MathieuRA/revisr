function stage_file() {
    jQuery("#unstaged > option:selected").each(function () {
        jQuery(this).remove().appendTo("#staged");
    });
    var num_staged = jQuery("#staged option").length;
    jQuery('#count_staged').innerHTML = num_staged;
}

function unstage_file() {
    jQuery("#staged > option:selected").each(function () {
        jQuery(this).remove().appendTo("#unstaged");
    });
    var num_staged = jQuery("#staged option").length;
    jQuery('#count_staged').innerHTML = num_staged;
}

function stage_all() {
    jQuery("#unstaged > option").each(function () {
        jQuery(this).remove().appendTo("#staged");
    });
    var num_staged = jQuery("#staged option").length;
    jQuery('#count_staged').innerHTML = num_staged;
}

function unstage_all() {
    jQuery("#staged > option").each(function () {
        jQuery(this).remove().appendTo("#unstaged");
    });
    var num_staged = jQuery("#staged option").length;
    jQuery('#count_staged').innerHTML = num_staged;
}

function commit_files() {
    jQuery("#staged option").each(function() {
        jQuery(this).attr("selected", "selected");
    });
    jQuery("#commit").val("Committing...");
    jQuery("#revisr-spinner").css('visibility', 'visible');
}

jQuery(document).ready(function($) {

    // Load any pending/untracked files via AJAX in case there are a lot of results.
    if ( 'admin_page_revisr_new_commit' === adminpage ) {

        var data = {
            action: 'pending_files',
            security: staging_vars.ajax_nonce
        };

        $.post(ajaxurl, data, function(response) {
            document.getElementById('pending_files_result').innerHTML = response;
        });

    }

    var url = document.URL;
    var empty_title  = url.indexOf("message=42");
    var empty_commit = url.indexOf("message=43");
    var error_commit = url.indexOf("message=44");

    if ( empty_title != "-1" ) {
        document.getElementById('message').innerHTML = "<div class='error'><p>" + staging_vars.empty_title_msg + "</p></div>";
    }
    if ( empty_commit != "-1" ) {
        document.getElementById('message').innerHTML = "<div class='error'><p>" + staging_vars.empty_commit_msg + "</p></div>";
    }
    if ( error_commit != "-1" ) {
        document.getElementById('message').innerHTML = "<div class='error'><p>" + staging_vars.error_commit_msg + "</p></div>";
    }

});

jQuery(document).on("dblclick", ".pending", function (event) {
    var pending = event.target.value;
    var status  = pending.substr(0, 3);
    if ( status.indexOf( 'M' ) !== -1 ) {
        var file = ajaxurl + "?action=process_view_diff&security=" + staging_vars.ajax_nonce + "&file=" + pending.substr(3);
        tb_show(staging_vars.view_diff, file);
    }
});

jQuery(document).on("dblclick", ".committed", function (event) {
    var pending = event.target.value;
    var commit  = document.getElementById('commit_hash').value;
    var status  = pending.substr(0, 2);
    var file    = pending.substr(2);
    if ( status.indexOf( 'M' ) !== -1 ) {
        var file = ajaxurl + "?action=process_view_diff&security=" + staging_vars.ajax_nonce + "&file=" + file.trim() + "&commit=" + commit;
        tb_show("View Diff", file);
    }
});
