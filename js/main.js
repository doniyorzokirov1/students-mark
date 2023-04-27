const elTemplate = document.getElementById('student-template').content
const elStudentList = document.getElementById('students-table-body')
const elForm = document.querySelector('.filter')
const elInput = document.getElementById('search')
const modalForm = document.getElementById('add-form')
const modalName = document.getElementById('name')
const modalLastName = document.getElementById('lastname')
const modalStudentMark = document.getElementById('mark')
const elSort = document.getElementById('sortby')

let count = document.querySelector('.count')
let elFrom = document.getElementById('from')
let elTo = document.getElementById('to')
let date = new Date()

Object.prototype.toMadeDate = function () {
  let day = String(date.getDate()).padStart(2, 0)
  let month = String(date.getMonth() + 1).padStart(2, 0)
  let year = String(date.getFullYear())

  return `${day}. ${month}. ${year}`
}

let sortFn = {
  az: (a, b) => {
    if (a.fullName > b.fullName) {
      return 1
    }
    if (a.fullName < b.fullName) {
      return -1
    }
    return 0
  },
  za: (a, b) => {
    if (a.fullName > b.fullName) {
      return -1
    }
    if (a.fullName < b.fullName) {
      return 1
    }
    return 0
  },
  markToLow: (a, b) => b.mark - a.mark,
  markToHigh: (a, b) => a.mark - b.mark,
  date: (a, b) => b.markedDate.getTime() - a.markedDate.getTime(),
}

// --> starts functions

const addStudent = (e) => {
  e.preventDefault()
  let obj = {
    id: students.length + 100,
    fullName: modalName.value.trim() + ' ' + modalLastName.value.trim(),
    mark: Number(modalStudentMark.value.trim()),
    markedDate: toMadeDate(),
  }
  students.unshift(obj)
  modalName.value = null
  modalLastName.value = null
  modalStudentMark.value = null

  renderStudents(students)
}

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
    studentMarkedDate.textContent = toMadeDate()
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

const onFilter = (e) => {
  e.preventDefault()

  let serachValue = elInput.value.trim()
  let regex = new RegExp(serachValue.toUpperCase(), 'gi')
  let filteredStudents = []

  students.forEach((student) => {
    let text = student.fullName.match(regex)

    if (!serachValue) {
      return filteredStudents.push(student)
    }

    if (student.fullName.match(regex)) {
      filteredStudents.unshift({
        ...student,
        fullName: student.fullName.replace(
          text,
          `<mark style="background-color: rgb(0, 208, 255); color: #fff;">${text}</mark>`,
        ),
      })
      elInput.value = null
    }
  })

  if (elFrom.value && elTo.value) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.mark >= elFrom.value - 0 && student.mark <= elTo.value - 0,
    )
  }

  if (elSort.value) {
    filteredStudents.sort(sortFn[elSort.value])
  }

  renderStudents(filteredStudents)
}

renderStudents(students)
modalForm.addEventListener('submit', addStudent)
elForm.addEventListener('submit', onFilter)
