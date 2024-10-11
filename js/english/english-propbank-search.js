function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/english/english-propbank.js');

function createPredicateTable(predicateName){
    let display = "<table> <tr> <th>Id</th> <th>Name</th> <th>Descr</th> <th>f</th> <th>n</th> </tr>";
    for (let i = 0; i < englishPropBank.length; i++) {
        let frame = englishPropBank[i];
        if (frame["lemma"] === predicateName) {
            let roleSets = frame["rolesets"]
            for (let roleSet of roleSets) {
                for (let j = 0; j < roleSet["roles"].length; j++) {
                    display = display + "<tr><td>" + roleSet["id"] + "</td><td>" + roleSet["name"] + "</td>"
                    let role = roleSet["roles"][j];
                    display = display + "<td>" + role["descr"] + "</td><td>" + role["f"] + "</td><td>" + role["n"] + "</td></tr>"
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

function createRoleSetTable(roleSetName){
    let display = "<table> <tr> <th>Descr</th> <th>f</th> <th>n</th> </tr>";
    for (let i = 0; i < englishPropBank.length; i++) {
        let frame = englishPropBank[i];
        let roleSets = frame["rolesets"]
        for (let roleSet of roleSets) {
            if (roleSet["id"] === roleSetName){
                display = roleSet["name"] + "<br>" + display;
                for (let j = 0; j < roleSet["roles"].length; j++) {
                    let role = roleSet["roles"][j];
                    display = display + "<tr><td>" + role["descr"] + "</td><td>" + role["f"] + "</td><td>" + role["n"] + "</td></tr>"
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

document.getElementById('predicateSeaarch').addEventListener('submit', function (event) {
    event.preventDefault();
    const predicateName = document.getElementById('predicate_name').value;
    document.getElementById("result").innerHTML = createPredicateTable(predicateName);
})

document.getElementById('roleSetSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const roleSetName = document.getElementById('roleset_id').value;
    document.getElementById("result").innerHTML = createRoleSetTable(roleSetName);
})