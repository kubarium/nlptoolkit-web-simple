
$(function () {
    $(".uk-breadcrumb").hide()

    $(".uk-navbar-dropdown-nav a").on("click", (event) => {
        event.preventDefault();

        $("iframe").attr("src", $(event.target).attr("href"));

        $("#language").text($(event.target).parents(".uk-navbar-dropdown").siblings("a").text().toString());
        $("#toolkit").text($(event.target).text())
        $(".uk-breadcrumb").show()
    })

    $(".uk-navbar-dropdown-nav a").first().trigger("click")
});