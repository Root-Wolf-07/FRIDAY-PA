# Digital Forensics & Data Recovery

> Forensic suites (Autopsy, Sleuth Kit, SIFT Workstation) and partition/data recovery tools (TestDisk, Extundelete, Recuva).

---

## Category: Data Recovery

### [Recuva](https://www.ccleaner.com/recuva)

Recuva is a data recovery tool that can be used to recover deleted files from your computer. 

It is often used to recover deleted files that may contain valuable information, such as deleted logs or documents that could be used to investigate a security incident. 

Recuva can recover files from hard drives, USB drives, and memory cards, and it is available for Windows and Mac operating systems.

**Install:** 

You can download the tool from [here](https://www.ccleaner.com/recuva).

**Usage:** 

Nice step by step [guide](https://toolbox.iskysoft.com/data-recovery-tips/recuva-windows-10.html).

![image](https://user-images.githubusercontent.com/100603074/210668891-58312f55-d4d0-4f77-9cd6-f716bbdb5b44.png)

*Image used from https://www.softpedia.com/blog/recuva-explained-usage-video-and-download-503681.shtml*

---

### [Extundelete](https://extundelete.sourceforge.net/)

Extundelete is a utility that can be used to recover deleted files from an ext3 or ext4 file system. 

It works by searching the file system for blocks of data that used to belong to a file, and then attempting to recreate the file using those blocks of data. It is often used to recover important files that have been accidentally or maliciously deleted. 

**Install:** 

You can download the tool from [here](https://sourceforge.net/project/platformdownload.php?group_id=260221).

**Usage:** 

```bash
# Prints information about the filesystem from the superblock.
--superblock

# Attemps to restore the file which was deleted at the given filename, called as "--restore-file dirname/filename".
--restore-file path/to/deleted/file

# Restores all files possible to undelete to their names before deletion, when possible. Other files are restored to a filename like "file.NNNN".
--restore-all
```

Full usage information can be found [here](https://extundelete.sourceforge.net/options.html).

![image](https://user-images.githubusercontent.com/100603074/210669234-0d2d4920-7856-4731-b81c-3d7132f752ad.png)

*Image used from https://theevilbit.blogspot.com/2013/01/backtrack-forensics-ext34-file-recovery.html*

---

### [TestDisk](https://www.cgsecurity.org/wiki/TestDisk_Download)

TestDisk is a free and open-source data recovery software tool that is designed to help recover lost partitions and make non-booting disks bootable again. It is useful for both computer forensics and data recovery. 

It can be used to recover data that has been lost due to a variety of reasons, such as accidental deletion, formatting, or corruption of the partition table. 

TestDisk can also be used to repair damaged boot sectors, recover deleted partitions, and recover lost files. It supports a wide range of file systems, including FAT, NTFS, and ext2/3/4, and can be used to recover data from disks that are damaged or formatted with a different file system than the one they were originally created with.

**Install:** 

You can download the tool from [here](https://www.cgsecurity.org/wiki/TestDisk_Download).

**Usage:** 

Full usage examples [here](https://www.cgsecurity.org/wiki/Data_Recovery_Examples).

[Step by step guide](https://www.cgsecurity.org/wiki/TestDisk_Step_By_Step)

[TestDisk Documentation PDF - 60 Pages](https://www.cgsecurity.org/testdisk.pdf)

![image](https://user-images.githubusercontent.com/100603074/210668956-4ed75998-bd6d-48cf-a2e7-dfa75656eece.png)

*Image used from https://www.cgsecurity.org/wiki/*

Digital Forensics
====================

*Tools for conducting forensic investigations of digital devices and systems, including tools for collecting and analyzing evidence.*

---

## Category: Digital Forensics

### [SANS SIFT](https://www.sans.org/tools/sift-workstation/)

SANS SIFT (SANS Investigative Forensic Toolkit) is a powerful toolkit for forensic analysis and incident response. 

It is a collection of open source and commercial tools that can be used to perform forensic analysis on a wide range of systems, including Windows, Linux, and Mac OS X. The SANS SIFT kit is designed to be run on a forensic workstation, which is a specialized computer that is used to perform forensic analysis on digital evidence.

The SANS SIFT kit is particularly useful for blue teamers, as it provides a wide range of tools and resources that can be used to investigate incidents, respond to threats, and perform forensic analysis on compromised systems.

**Install:** 

1. Visit [https://www.sans.org/tools/sift-workstation/](https://www.sans.org/tools/sift-workstation/).

2. Click the 'Login to Download' button and input (or create) your SANS Portal account credentials to download the virtual machine. 

3. Once you have booted the virtual machine, use the credentials below to gain access.

```
Login = sansforensics
Password = forensics
```

**Note:** *Use to elevate privileges to root while mounting disk images.*

Additional install options [here](https://www.sans.org/tools/sift-workstation/).

**Usage:** 

```bash
# Registry Parsing - Regripper
rip.pl -r <HIVEFILE> -f <HIVETYPE>

# Recover deleted registry keys
deleted.pl <HIVEFILE>

# Mount E01 Images
ewfmount image.E01 mountpoint
mount -o

# Stream Extraction
bulk_extractor <options> -o output_dir
```

Full usage guide [here](https://www.sans.org/posters/sift-cheat-sheet/).

![image](https://user-images.githubusercontent.com/100603074/210668984-bdec731b-ce80-4c3b-9696-9431dd77f9b0.png)

*Image used from https://securityboulevard.com/2020/08/how-to-install-sift-workstation-and-remnux-on-the-same-system-for-forensics-and-malware-analysis/*

---

### [The Sleuth Kit](https://sleuthkit.org/sleuthkit/)

The Sleuth Kit is a collection of command line tools that can be used to analyze disk images and recover files from them. 

It is primarily used by forensic investigators to examine digital evidence after a computer has been seized or an image of a disk has been made. It can be useful because it can help understand what happened during a security incident and identify any malicious activity. 

The tools in The Sleuth Kit can be used to extract deleted files, analyze disk partition structures, and examine the file system for evidence of tampering or unusual activity.

**Install:** 

Download tool from [here](https://sleuthkit.org/sleuthkit/download.php).

**Usage:** 

Link to [documentation](https://sleuthkit.org/sleuthkit/docs.php).

![image](https://user-images.githubusercontent.com/100603074/210669006-6dfab59d-b50e-49db-b390-b9ef27cab6fe.png)

*Image used from http://www.effecthacking.com/2016/09/the-sleuth-kit-digital-forensic-tool.html*

---

### [Autopsy](https://www.autopsy.com/)

Autopsy is a digital forensics platform and graphical interface to The Sleuth Kit and other digital forensics tools.

It is used by law enforcement, military, and corporate examiners to investigate what happened on a computer. You can use it to analyze disk images and recover files, as well as to identify system and user activity. 

Autopsy is used by "blue teams" (the cybersecurity professionals who defend organizations against attacks) to conduct forensic analysis and incident response. It can help blue teams understand the nature and scope of an attack, and identify any malicious activity that may have occurred on a computer or network.

**Install:** 

Download the tool from [here](https://www.autopsy.com/download/).

**Usage:** 

[Autopsy User Guide](http://sleuthkit.org/autopsy/docs/user-docs/4.19.3//)

[SANS - Introduction to using the AUTOPSY Forensic Browser](https://www.sans.org/blog/a-step-by-step-introduction-to-using-the-autopsy-forensic-browser/)

![image](https://user-images.githubusercontent.com/100603074/210669037-449e7790-85c8-4b8c-97b9-2b46a1ea6e61.png)

*Image used from https://www.kitploit.com/2014/01/autopsy-digital-investigation-analysis.html*

Security Awareness Training
====================

*Tools for training employees and other users on how to recognize and prevent potential security threats.*

---

