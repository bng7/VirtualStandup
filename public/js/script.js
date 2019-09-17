let notesOuput = document.querySelector('.notes-output');
let selectTeamMembers = document.querySelector('.selectTeamMembers');
let selectProject = document.querySelector('.selectProject');
let workYesterday = document.querySelector('#workYesterday');
let workToday = document.querySelector('#workToday');
let impediments = document.querySelector('#impediments');
let message = document.querySelector('.msg-success');
let btnAddNote = document.querySelector('.btnAddNote');
let btnAddMember = document.querySelector('.btnAddMember');
let btnAddProject = document.querySelector('.btnAddProject');
let filter = document.querySelector('.filter');
let teamMemberName = document.querySelector('#teamMemberName');
let projectName = document.querySelector('#projectName');
let projectDescription = document.querySelector('#projectDescription');

document.addEventListener('DOMContentLoaded', function () {
    let options;

    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, options);
});

btnAddNote.addEventListener('click', () => {
    addStandupNote();
})

btnAddMember.addEventListener('click', () => {
    let teamMember = {
        name: teamMemberName.value
    }

    fetch('http://3.24.27.105/api/team', {
        method: 'POST',
        body: JSON.stringify(teamMember),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                showSuccess(res.message);
                loadFilterList();
            }
        })
})

btnAddProject.addEventListener('click', () => {
    let project = {
        name: projectName.value,
        description: projectDescription.value
    }

    fetch('http://3.24.27.105/api/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                showSuccess(res.message);
            }
        })

})

filter.addEventListener('change', (e) => {
    let teamMember = e.target.value;

    fetch(`http://3.24.27.105/api/standup/${teamMember}`)
        .then(res => res.json())
        .then(res => {
            let notes = res.notes;
            populateNotes(notes);
        })
})

$(document).ready(function () {
    $('#newNote').modal({

        onOpenEnd: () => {
            populateTeamMembers();
            populateProjects();
        },
    });

    $('#newMember').modal();
    $('#newProject').modal();

});


function getNotes() {
    fetch('http://3.24.27.105/api/standup')
        .then(res => res.json())
        .then(res => {
            let notes = res.notes;
            populateNotes(notes);
        })
}

function populateNotes(notes) {
    let output = '';

    for (let i = 0; i < notes.length; i++) {
        output += `
        <div class="row">
        <div class="col s6 offset-s3">
          <div class="card">
            <div class="card-content black-text">
              <span class="card-title">${notes[i].project}</span>
              <p><b>Team Member:</b> <span>${notes[i].teamMember}</span></p>
              <p><b>Work Done Yesterday:</b> <span>${notes[i].workYesterday}</span></p>
              <p><b>Work Today:</b> <span>${notes[i].workToday}</span></p>
              <p><b>Impediments:</b> <span>${notes[i].impediments}</span></p>
              <p><b>Date:</b> <span>${notes[i].createdOn}</span></p>
            </div>
          </div>
        </div>
      </div>`

        notesOuput.innerHTML = output;

    }
}

async function populateTeamMembers() {
    let options = '';
    let teamMembers = await getTeamMembers();

    for (let i = 0; i < teamMembers.length; i++) {
        options += `<option value="${teamMembers[i].name}">${teamMembers[i].name}</option>`
    }

    selectTeamMembers.innerHTML = options;

    $('select').formSelect();


}

async function populateProjects() {
    let options = '';
    let projects = await getProjects();

    for (let i = 0; i < projects.length; i++) {
        options += `<option value="${projects[i].name}">${projects[i].name}</option>`
    }

    selectProject.innerHTML = options;

    $('select').formSelect();

}

function getTeamMembers() {
    return new Promise((resolve, reject) => {
        fetch('http://3.24.27.105/api/team')
            .then(res => res.json())
            .then(res => {
                let teamMembers = res.teamMembers;
                resolve(teamMembers);
            })
    })
}

function getProjects() {
    return new Promise((resolve, reject) => {
        fetch('http://3.24.27.105/api/projects')
            .then(res => res.json())
            .then(res => {
                let projects = res.projects;
                resolve(projects);
            })
    })
}

function addStandupNote() {
    let note = {
        teamMember: selectTeamMembers.value,
        project: selectProject.value,
        workYesterday: workYesterday.value,
        workToday: workToday.value,
        impediments: impediments.value
    }

    fetch('http://3.24.27.105/api/standup', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                showSuccess(res.message);
                getNotes();
            }
        })
}

async function loadFilterList() {
    let teamMembers = await getTeamMembers();
    let options = '<option value="" disabled selected>Select Team Member</option>';

    for (let i = 0; i < teamMembers.length; i++) {
        options += `<option value="${teamMembers[i].name}">${teamMembers[i].name}</option>`
    }

    filter.innerHTML = options;
    $('.filter').formSelect();

}

function showSuccess(successMessage) {
    message.innerHTML = successMessage;
    message.removeAttribute('hidden');

    setTimeout(() => {
        message.setAttribute('hidden', true);
    }, 4000)
}

getNotes();
loadFilterList();
