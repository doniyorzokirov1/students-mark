const elTemplate = document.getElementById('student-template').content
const elStudentList = document.getElementById('students-table-body')
const elForm = document.querySelector('.filter')
const elInput = document.getElementById('search')
const modalForm = document.getElementById('add-form')
const modalName = document.getElementById('name')
const modalLastName = document.getElementById('lastname')
const modalStudentMark = document.getElementById('mark')

let count = document.querySelector('.count')

const addStudent = (e) => {
  e.preventDefault()
  let obj = {
    id: students.length + 100,
    fullName: modalName.value.trim() + ' ' + modalLastName.value.trim(),
    mark: Number(modalStudentMark.value.trim()),
    markedDate: new Date('2021-12-06').toISOString(),
  }
  students.unshift(obj)
  modalName.value = null
  modalLastName.value = null
  modalStudentMark.value = null

  renderStudents(students)
}

modalForm.addEventListener('submit', addStudent)

function renderStudents(arr) {
  elStudentList.innerHTML = null
  arr.forEach((student) => {
    let cloneTemp = elTemplate.cloneNode(true)

    let studentId = cloneTemp.querySelector('.student-id')
    let studentName = cloneTemp.querySelector('.student-name')
    let studentMarkedDate = cloneTemp.querySelector('.student-marked-date')
    let studentMark = cloneTemp.querySelector('.student-mark')
    let studentPassStatus = cloneTemp.querySelector('.student-pass-status')

    studentId.textContent = student.id
    studentName.innerHTML = student.fullName
    studentMarkedDate.textContent = student.markedDate
    studentMark.textContent = student.mark

    if (student.mark >= 104) {
      studentPassStatus.textContent = 'success'
      studentPassStatus.classList.add('bg-success')
    } else {
      studentPassStatus.textContent = 'reject'
      studentPassStatus.classList.add('bg-danger')
    }

    elStudentList.append(cloneTemp)
    count.textContent = students.length
  })
}

renderStudents(students)

const onFilter = (e) => {
  e.preventDefault()
  let serachValue = elInput.value.trim()

  if (!serachValue) {
    return alert('Input some value')
  }

  let regex = new RegExp(serachValue.toUpperCase(), 'gi')
  let regexMark = new RegExp(serachValue, `ig`)

  console.log(serachValue.toUpperCase())
  console.log(serachValue)
  console.log(regexMark)
  let filteredStudents = []
  students.forEach((student) => {
    let upperCase = student.fullName.toUpperCase()
    if (upperCase.match(regex)) {
      filteredStudents.unshift({
        ...student,
        fullName: student.fullName.replace(
          serachValue,
          `<mark>${serachValue}</mark>`,
        ),
      })
      console.log(filteredStudents)
    }
  })
  renderStudents(filteredStudents)
}

elForm.addEventListener('submit', onFilter)
// .replace(
//     serachValue,
//     `<mark>${serachValue}</mark>`,
