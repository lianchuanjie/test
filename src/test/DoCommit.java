package test;

import java.io.File;ss

import org.tmatesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.internal.wc.DefaultSVNOptions;
import org.tmatesoft.svn.core.wc.ISVNOptions;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNStatus;
import org.tmatesoft.svn.core.wc.SVNStatusType;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class DoCommit {
tesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.internal.wc.DefaultSVNOptions;
import org.tmatesoft.svn.core.wc.ISVNOptions;
import org.tmatesoft.svn.core.wc.SVNClientManager;
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//注意：执行此操作要先执行checkout操作。因为本地需要有工作副本此范例才能运行。
		//初始
				(DefaultSVNOptions) options, name, password);
		//要提交的文件
		File commitFile=new File("D:/svntest/svnkittest/branches/doImport.txt");
		//获取此文件的状态（是文件做了修改还是新添加的文件？）
		SVNStatus status = null;
		try {
			status = ourClientManager.getStatusClient().doStatus(commitFile, true);
			//化支持svn://协议的库
		SVNRepositoryFactoryImpl.setup();
		String name = "hanyi";
		String password = "hanyi";
		ISVNOptions options = SVNWCUtil.createDefaultOptions(true);
		//实例化客户端管理类
		ourClientManager = SVNClientManager.newInstance(ue, false, SVNDepth.INFINITY);
				System.out.println("add");
			}
			//如果此文件不是新增加的，直接提交。
			else{
				ourClientManager.getCommitClient().doCommit(
						new File[] { commitFile }, true, "",null,null,true, false, SVNDepth.INFINITY);
				System.out.println("commit");
			}
		} catch (SVNException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(status.getContentsStatus());
化支持svn://协议的库
		SVNRepositoryFactoryImpl.setup();
		String name = "hanyi";
		String password = "hanyi";
		ISVNOptions options = SVNWCUtil.createDefaultOptions(true);
		//实例化客户端管理类
		ourClientManager = SVNClientManager.newInstance(
	}

}
